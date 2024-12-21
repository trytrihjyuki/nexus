import { Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
      gridHelper: Object3DNode<THREE.GridHelper, typeof THREE.GridHelper>;
      axesHelper: Object3DNode<THREE.AxesHelper, typeof THREE.AxesHelper>;
    }
  }
}
