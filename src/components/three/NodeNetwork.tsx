import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 42;
const CONNECTIONS = 70;

type NodeSpec = {
  radius: number;
  speed: number;
  phase: number;
  inclination: number;
  tiltPhase: number;
  size: number;
};

/**
 * Orbital node network — instanced spheres riding individual orbits,
 * with dynamic connection lines to nearby nodes. The "interconnected
 * nodes" of the automation theme. Instancing keeps this at 2 draw calls.
 */
export const NodeNetwork = ({ motionScale = 1 }: { motionScale?: number }) => {
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const nodes = useMemo<NodeSpec[]>(
    () =>
      Array.from({ length: NODE_COUNT }, (_, i) => ({
        radius: 3.2 + ((i * 0.37) % 4.6),
        speed: 0.08 + Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
        inclination: (Math.random() - 0.5) * 1.1,
        tiltPhase: Math.random() * Math.PI * 2,
        size: 0.045 + Math.random() * 0.055,
      })),
    []
  );

  const pairs = useMemo(() => {
    // Connect nodes whose orbital radii are close — reads as a mesh, not spaghetti
    const pairs: [number, number][] = [];
    for (let i = 0; i < NODE_COUNT && pairs.length < CONNECTIONS; i++) {
      for (let j = i + 1; j < NODE_COUNT && pairs.length < CONNECTIONS; j++) {
        if (Math.abs(nodes[i].radius - nodes[j].radius) < 1.1 && Math.random() < 0.35) {
          pairs.push([i, j]);
        }
      }
    }
    return pairs;
  }, [nodes]);

  const linePositions = useMemo(
    () => new Float32Array(pairs.length * 6),
    [pairs.length]
  );

  const nodePositions = useMemo(() => new Float32Array(NODE_COUNT * 3), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i];
      const a = n.phase + t * n.speed * motionScale;
      const x = Math.cos(a) * n.radius;
      const z = Math.sin(a) * n.radius;
      const y = Math.sin(a * 0.7 + n.tiltPhase) * n.inclination * 1.6;
      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      dummy.position.set(x, y, z);
      const pulse = 1 + Math.sin(t * 1.4 + n.phase * 3) * 0.18;
      dummy.scale.setScalar(n.size * pulse);
      dummy.updateMatrix();
      instancedRef.current?.setMatrixAt(i, dummy.matrix);
    }
    if (instancedRef.current) instancedRef.current.instanceMatrix.needsUpdate = true;

    for (let p = 0; p < pairs.length; p++) {
      const [i, j] = pairs[p];
      linePositions[p * 6] = nodePositions[i * 3];
      linePositions[p * 6 + 1] = nodePositions[i * 3 + 1];
      linePositions[p * 6 + 2] = nodePositions[i * 3 + 2];
      linePositions[p * 6 + 3] = nodePositions[j * 3];
      linePositions[p * 6 + 4] = nodePositions[j * 3 + 1];
      linePositions[p * 6 + 5] = nodePositions[j * 3 + 2];
    }
    if (linesRef.current) {
      (linesRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <group>
      <instancedMesh ref={instancedRef} args={[undefined, undefined, NODE_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="#5fd4ff" toneMapped={false} />
      </instancedMesh>
      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={pairs.length * 2} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#1d5f8f" transparent opacity={0.38} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
};
