import * as THREE from "three";

export interface PieceTransform {

    position: THREE.Vector3;

    rotation: THREE.Euler;

}

export function pieceTransform(
    index: number,
    total: number,
    radius = 0.09
): PieceTransform {

    const angle = (index / total) * Math.PI * 2;

    return {

        position: new THREE.Vector3(
            Math.cos(angle) * radius,
            0.0325,
            Math.sin(angle) * radius
        ),

        rotation: new THREE.Euler(
            0,
            angle + Math.PI / 6,
            0
        )

    };

}