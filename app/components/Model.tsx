'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

// Extend GLTF to include nodes and materials
interface GLTFResult extends GLTF {
  nodes: { [name: string]: THREE.Object3D };
  materials: { [name: string]: THREE.Material };
}

type ModelProps = {
  rotationY: number;
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
  const gltf = useGLTF('/model/snowman.glb') as unknown as GLTFResult;

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
