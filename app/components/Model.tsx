'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

type ModelProps = {
  rotationY: number; // rotation in radians
};

export default function Model({ rotationY }: ModelProps) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [20, 20, 2] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} />
        <gridHelper args={[10, 10, '#00ff00', '#00ff00']} />
        <axesHelper args={[5]} />
        <LlamaModel rotationY={rotationY} />
      </Canvas>
    </div>
  );
}

function LlamaModel({ rotationY }: { rotationY: number }) {
  const group = useRef<THREE.Group>(null);
  
  // Attempt to load the model
  let gltf;
  try {
    gltf = useGLTF('/model/snowman.glb') as { scene: THREE.Group };
  } catch (e) {
    gltf = { scene: null };
  }

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = rotationY;
    }
  });

  // If no model is loaded, show a box so we know something is rendered
  if (!gltf.scene) {
    return (
      <mesh ref={group} scale={[1, 1, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={[0.5, 0.5, 0.5]} />
    </group>
  );
}
