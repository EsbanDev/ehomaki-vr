import * as THREE from "three";
import type { Dish } from "@/types/experienciaVR";

import { bakeGeometry, mergedMesh } from "./GeometryUtils";
import { pieceTransform } from "./Layout";

const FILL_OUTER_GEO = new THREE.CircleGeometry(0.020, 16);
const FILL_INNER_GEO = new THREE.CircleGeometry(0.011, 14);

export function createFillings(dish: Dish): THREE.Mesh[] {

    const outerGeoms: THREE.BufferGeometry[] = [];
    const innerGeoms: THREE.BufferGeometry[] = [];

    const pieces = 6;

    for (let i = 0; i < pieces; i++) {

        const transform = pieceTransform(i, pieces);

        outerGeoms.push(

            bakeGeometry(
                FILL_OUTER_GEO,
                {
                    position: transform.position.clone().setY(0.0226),
                    rotation: new THREE.Euler(-Math.PI / 2, 0, 0)
                }
            )

        );

        if (dish.fillingColor2) {

            innerGeoms.push(

                bakeGeometry(
                    FILL_INNER_GEO,
                    {
                        position: transform.position.clone().setY(0.0228),
                        rotation: new THREE.Euler(-Math.PI / 2, 0, 0)
                    }
                )

            );

        }

    }

    const meshes: THREE.Mesh[] = [];

    meshes.push(

        mergedMesh(

            outerGeoms,

            new THREE.MeshStandardMaterial({

                color: dish.fillingColor,

                roughness: 0.5

            })

        )

    );

    if (innerGeoms.length > 0) {

        meshes.push(

            mergedMesh(

                innerGeoms,

                new THREE.MeshStandardMaterial({

                    color: dish.fillingColor2!,

                    roughness: 0.5

                })

            )

        );

    }

    meshes.forEach(mesh => mesh.castShadow = true);

    return meshes;

}