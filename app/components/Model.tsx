'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

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
        <SnowmanModel rotationY={rotationY} />
      </Canvas>
    </div>
  );
}

function SnowmanModel({ rotationY }: { rotationY: number }) {
  const group = useRef<THREE.Group>(null);

  // Ensure your model is in /public/model/snowman.glb
  const gltf = useGLTF('/model/snowman.glb') as any;

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = rotationY;
    }
  });

  if (!gltf || !gltf.scene) {
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
