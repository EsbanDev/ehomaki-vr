import * as THREE from "three";
import type { Dish } from "@/types/experienciaVR";

import { bakeGeometry, mergedMesh } from "../GeometryUtils";
import { pieceTransform } from "../Layout";

const CRISPY_STRIP_GEO = new THREE.CylinderGeometry(
    0.003,
    0.003,
    0.045,
    6
);

export function createCrispy(dish: Dish): THREE.Mesh {

    const geoms: THREE.BufferGeometry[] = [];

    const pieces = 6;

    for (let i = 0; i < pieces; i++) {

        const transform = pieceTransform(i, pieces);

        for (let j = 0; j < 6; j++) {

            geoms.push(

                bakeGeometry(
                    CRISPY_STRIP_GEO,
                    {
                        position: transform.position.clone().add(

                            new THREE.Vector3(

                                (Math.random() - 0.5) * 0.03,

                                0.055 + Math.random() * 0.012,

                                (Math.random() - 0.5) * 0.03

                            )

                        ),

                        rotation: new THREE.Euler(

                            Math.random(),

                            Math.random() * Math.PI,

                            Math.random()

                        )

                    }
                )

            );

        }

    }

    const mesh = mergedMesh(

        geoms,

        new THREE.MeshStandardMaterial({

            color: dish.topping!.color,

            roughness: 0.8

        })

    );

    mesh.castShadow = true;

    return mesh;

}