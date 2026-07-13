import * as THREE from "three";
import type { Dish } from "@/types/experienciaVR";

import { bakeGeometry, mergedMesh } from "../GeometryUtils";
import { pieceTransform } from "../Layout";

const DRAPE_CAP_GEO = new THREE.SphereGeometry(
    0.03,
    12,
    8,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
);

export function createDrape(dish: Dish) {

    const geoms: THREE.BufferGeometry[] = [];

    const pieces = 6;

    for (let i = 0; i < pieces; i++) {

        const transform = pieceTransform(i, pieces);

        geoms.push(

            bakeGeometry(
                DRAPE_CAP_GEO,
                {
                    position: transform.position.clone().setY(0.0225),
                    rotation: new THREE.Euler(
                        0,
                        Math.random() * Math.PI,
                        0
                    ),
                    scale: new THREE.Vector3(
                        1.15,
                        0.55,
                        1.15
                    )
                }
            )

        );

    }

    const mesh = mergedMesh(

        geoms,

        new THREE.MeshStandardMaterial({

            color: dish.topping!.color,

            roughness: 0.5

        })

    );

    mesh.castShadow = true;

    return mesh;

}