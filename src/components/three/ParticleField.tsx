import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 1600;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uMotionScale;
  attribute float aScale;
  attribute vec3 aRandom;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    // Flowing data-stream drift — slow, layered sine fields
    pos.x += sin(uTime * 0.22 + aRandom.x * 12.0) * 1.6 * uMotionScale;
    pos.y += cos(uTime * 0.16 + aRandom.y * 10.0) * 1.1 * uMotionScale;
    pos.z += sin(uTime * 0.19 + aRandom.z * 11.0) * 1.4 * uMotionScale;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * aScale * (1.0 / max(0.001, -mvPosition.z));
    vAlpha = 0.25 + 0.75 * abs(sin(uTime * 0.4 + aRandom.x * 6.2831));
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float a = smoothstep(0.5, 0.0, d);
    vec3 color = mix(uColorA, uColorB, clamp(d * 2.2, 0.0, 1.0));
    gl_FragColor = vec4(color, a * vAlpha);
  }
`;

/**
 * Custom GLSL flowing particle field — the "data streams" of the automation theme.
 * One draw call, additive blending, animates in the vertex shader.
 */
export const ParticleField = ({ motionScale = 1 }: { motionScale?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, scales, randoms } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const randoms = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // Shell distribution around the scene volume
      const r = 5 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.7;
      scales[i] = 0.6 + Math.random() * 1.8;
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
    }
    return { positions, scales, randoms };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 26.0 },
      uMotionScale: { value: motionScale },
      uColorA: { value: new THREE.Color('#33c3f0') },
      uColorB: { value: new THREE.Color('#3e92cc') },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (uniforms.uMotionScale.value !== motionScale) {
      uniforms.uMotionScale.value = motionScale;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aScale" count={COUNT} array={scales} itemSize={1} />
        <bufferAttribute attach="attributes-aRandom" count={COUNT} array={randoms} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
