import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { ParticleField } from './ParticleField';
import { NodeNetwork } from './NodeNetwork';
import { AutomationCore } from './AutomationCore';

/** Scroll-linked camera: pulls back gently as the user scrolls into the page */
const ScrollCamera = ({ active }: { active: boolean }) => {
  const { camera } = useThree();
  const progress = useRef(0);

  useFrame(() => {
    if (!active) return;
    const heroHeight = window.innerHeight || 1;
    const target = Math.min(1, Math.max(0, window.scrollY / heroHeight));
    progress.current += (target - progress.current) * 0.08;
    const p = progress.current;
    camera.position.z = 9 + p * 3.2;
    camera.position.y = 1.4 + p * 1.2;
    camera.lookAt(0, 0.2 - p * 0.5, 0);
  }, -1);

  return null;
};

/** Mouse-parallax rig: the whole constellation leans toward the pointer */
const ParallaxRig = ({ children }: { children: React.ReactNode }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.16 - group.current.rotation.y) * 0.045;
    group.current.rotation.x += (-y * 0.1 - group.current.rotation.x) * 0.045;
  });

  return <group ref={group}>{children}</group>;
};

const SceneContent = ({ active, lowPower }: { active: boolean; lowPower: boolean }) => {
  const motionScale = lowPower ? 0.6 : 1;

  return (
    <>
      <ScrollCamera active={active} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={0.6} color="#8fb8e8" />

      <ParallaxRig>
        <AutomationCore motionScale={motionScale} />
        <NodeNetwork motionScale={motionScale} />
        <ParticleField motionScale={motionScale} />
      </ParallaxRig>

      {/* Local IBL — no third-party HDR fetches */}
      <Environment resolution={64}>
        <Lightformer intensity={1.2} color="#33c3f0" position={[0, 5, 0]} scale={[12, 12, 1]} />
        <Lightformer intensity={0.6} color="#0a2463" position={[-6, 1, -2]} rotation-y={Math.PI / 2} scale={[14, 3, 1]} />
        <Lightformer intensity={0.4} color="#3e92cc" position={[6, -2, 2]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
      </Environment>

      {!lowPower && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.55} luminanceThreshold={0.22} luminanceSmoothing={0.5} mipmapBlur />
          <ChromaticAberration offset={new THREE.Vector2(0.00045, 0.00045)} />
          <Vignette darkness={0.72} offset={0.22} />
        </EffectComposer>
      )}
    </>
  );
};

/**
 * Full automation constellation: core + orbital node network + GLSL particle
 * streams. DPR capped at 2, reduced particle budget on low-power devices,
 * render loop paused when off-screen, pointer-events disabled by the wrapper.
 */
export const AutomationScene = ({ active }: { active: boolean }) => {
  const { isLowPower } = useDeviceCapability();
  const readyRef = useRef(false);

  useEffect(() => {
    if (active && !readyRef.current) {
      readyRef.current = true;
      window.dispatchEvent(new CustomEvent('nafarro:scene-ready'));
    }
  }, [active]);

  return (
    <Canvas
      dpr={Math.min(window.devicePixelRatio || 1, isLowPower ? 1.5 : 2)}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 1.4, 9], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => window.dispatchEvent(new CustomEvent('nafarro:scene-ready'))}
      style={{ background: 'transparent' }}
    >
      <SceneContent active={active} lowPower={isLowPower} />
    </Canvas>
  );
};
