import * as THREE from "three";
import { mergedMesh, bakeGeometry } from "./GeometryUtils";
import type { Dish } from "@/types/experienciaVR";

const RICE_GEO = new THREE.CylinderGeometry(
    0.032,
    0.032,
    0.045,
    20
);

function pieceTransform(angle: number, radius: number) {

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

export function createRice(dish: Dish) {

    const riceGeoms: THREE.BufferGeometry[] = [];

    const pieces = 6;

    for (let i = 0; i < pieces; i++) {

        riceGeoms.push(

            bakeGeometry(
                RICE_GEO,
                pieceTransform(i, pieces)
            )

        );

    }

    const rice = mergedMesh(
        riceGeoms,
        new THREE.MeshStandardMaterial({
            color: dish.riceColor ?? 0xf5f1e6,
            roughness: 0.95
        })
    );

    rice.castShadow = true;

    return rice;

}