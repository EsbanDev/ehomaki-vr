import * as THREE from "three";
import { bakeGeometry, mergedMesh } from "./GeometryUtils";
import { pieceTransform } from "./Layout";

const NORI_GEO = new THREE.CylinderGeometry(
    0.0335,
    0.0335,
    0.046,
    20,
    1,
    true
);

const NORI_MATERIAL = new THREE.MeshStandardMaterial({
    color: 0x1f2a1e,
    roughness: 0.85,
    side: THREE.DoubleSide
});

export function createNori() {

    const geoms: THREE.BufferGeometry[] = [];

    const pieces = 6;

    for (let i = 0; i < pieces; i++) {

        geoms.push(
            bakeGeometry(
                NORI_GEO,
                pieceTransform(i, pieces)
            )
        );

    }

    const mesh = mergedMesh(
        geoms,
        NORI_MATERIAL
    );

    mesh.castShadow = true;

    return mesh;

}