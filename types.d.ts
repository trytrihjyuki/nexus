import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      axesHelper: ReactThreeFiber.Object3DNode<THREE.AxesHelper, typeof THREE.AxesHelper>;
    }
  }
}
