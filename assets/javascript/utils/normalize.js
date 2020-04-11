import * as THREE from 'three';

export default function normalizePosition(vector, width, height) {
    let x = (vector.x / width) * 2 - 1;
    let y = - (vector.y / height) * 2 + 1;

    return new THREE.Vector3(x, y, vector.z);
}