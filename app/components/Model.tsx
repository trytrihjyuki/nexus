'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

interface GLTFResult extends GLTF {
  scene: THREE.Group;
}

type ModelProps = {
  rotationY: number; // rotation in radians
};

export default function Model({ rotationY }: ModelProps) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [20, 20, 2] }}>
        {/* Three.js Lights */}
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} />

        {/* Helpers */}
        <gridHelper args={[10, 10, '#00ff00', '#00ff00']} />
        <axesHelper args={[5]} />

        {/* Model */}
        <SnowmanModel rotationY={rotationY} />
      </Canvas>
    </div>
  );
}

function SnowmanModel({ rotationY }: { rotationY: number }) {
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF('/model/snowman.glb') as GLTFResult;

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = rotationY;
    }
  });

  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={[0.5, 0.5, 0.5]} />
    </group>
  );
}
