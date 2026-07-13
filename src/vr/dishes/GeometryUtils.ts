import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export interface TransformOptions {
    position?: THREE.Vector3;
    rotation?: THREE.Euler;
    scale?: THREE.Vector3;
}

export function bakeGeometry(
    geometry: THREE.BufferGeometry,
    opts: TransformOptions = {}
) {
    const g = geometry.clone();

    const q = new THREE.Quaternion();

    if (opts.rotation) {
        q.setFromEuler(opts.rotation);
    }

    const matrix = new THREE.Matrix4().compose(
        opts.position ?? new THREE.Vector3(),
        q,
        opts.scale ?? new THREE.Vector3(1, 1, 1)
    );

    g.applyMatrix4(matrix);

    return g;
}

export function mergedMesh(
    geometries: THREE.BufferGeometry[],
    material: THREE.Material
) {
    return new THREE.Mesh(
        mergeGeometries(geometries, false),
        material
    );
}