import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * The "automation core" — a living mechanical/orbital form at the center
 * of the hero: distorted inner sphere, wireframe shell, and two orbital rings.
 */
export const AutomationCore = ({ motionScale = 1 }: { motionScale?: number }) => {
  const shellRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (shellRef.current) {
      shellRef.current.rotation.y += dt * 0.18 * motionScale;
      shellRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
    }
    if (ringARef.current) {
      ringARef.current.rotation.z += dt * 0.35 * motionScale;
      ringARef.current.rotation.x = 1.15;
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.z -= dt * 0.25 * motionScale;
      ringBRef.current.rotation.x = -0.9;
      ringBRef.current.rotation.y = 0.5;
    }
  });

  return (
    <group>
      {/* Inner energy core */}
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
        <mesh>
          <sphereGeometry args={[1.35, 48, 48]} />
          <MeshDistortMaterial
            color="#0a2463"
            emissive="#33c3f0"
            emissiveIntensity={0.32}
            roughness={0.25}
            metalness={0.85}
            distort={0.28}
            speed={1.6}
          />
        </mesh>
      </Float>

      {/* Wireframe shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[2.05, 1]} />
        <meshBasicMaterial color="#33c3f0" wireframe transparent opacity={0.22} />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ringARef}>
        <torusGeometry args={[3.0, 0.012, 8, 128]} />
        <meshBasicMaterial color="#3e92cc" transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh ref={ringBRef}>
        <torusGeometry args={[3.6, 0.01, 8, 128]} />
        <meshBasicMaterial color="#33c3f0" transparent opacity={0.35} toneMapped={false} />
      </mesh>

      {/* Core glow light */}
      <pointLight position={[0, 0, 0]} intensity={9} distance={12} color="#33c3f0" />
    </group>
  );
};
