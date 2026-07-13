import * as THREE from "three";
import type { Dish } from "@/types/experienciaVR";

import { bakeGeometry, mergedMesh } from "../GeometryUtils";

const SAUCE_CAP_GEO = new THREE.SphereGeometry(
    0.036,
    12,
    8,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
);

export function createSauceCap(dish: Dish) {

    const geoms: THREE.BufferGeometry[] = [];

    for (const transform of dish.layout) {

        geoms.push(

            bakeGeometry(
                SAUCE_CAP_GEO,
                {
                    position: transform.position.clone().add(
                        new THREE.Vector3(0, 0.021, 0)
                    ),

                    scale: new THREE.Vector3(
                        1.05,
                        0.4,
                        1.05
                    )
                }
            )

        );

    }

    const mesh = mergedMesh(

        geoms,

        new THREE.MeshStandardMaterial({

            color: dish.topping!.color,

            roughness: 0.25,

            metalness: 0.05

        })

    );

    mesh.castShadow = true;

    return mesh;

}