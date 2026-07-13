import * as THREE from "three";
import type { Dish } from "@/types/experienciaVR";

import { bakeGeometry, mergedMesh } from "./GeometryUtils";
import { pieceTransform } from "./Layout";

const DRIZZLE_SEG_GEO = new THREE.BoxGeometry(
    0.05,
    0.004,
    0.008
);

const HERB_GEO = new THREE.CircleGeometry(
    0.006,
    6
);

const SEED_GEO = new THREE.SphereGeometry(
    0.0035,
    6,
    6
);

export function createGarnish(dish: Dish): THREE.Mesh[] {

    const meshes: THREE.Mesh[] = [];

    const pieces = 6;

    //
    // Salsa
    //
    if (dish.garnish?.drizzleColor) {

        const drizzleGeoms: THREE.BufferGeometry[] = [];

        for (let i = 0; i < pieces; i++) {

            const transform = pieceTransform(i, pieces);

            drizzleGeoms.push(

                bakeGeometry(
                    DRIZZLE_SEG_GEO,
                    {
                        position: transform.position
                            .clone()
                            .setY(0.061),

                        rotation: new THREE.Euler(
                            0,
                            transform.rotation.y,
                            THREE.MathUtils.degToRad(15)
                        )
                    }
                )

            );

        }

        const drizzle = mergedMesh(

            drizzleGeoms,

            new THREE.MeshStandardMaterial({

                color: dish.garnish.drizzleColor,

                roughness: 0.25,

                metalness: 0.05

            })

        );

        drizzle.castShadow = true;

        meshes.push(drizzle);

    }

    //
    // Hierbas
    //
    if (dish.garnish?.herbColor) {

        const herbGeoms: THREE.BufferGeometry[] = [];

        for (let i = 0; i < pieces; i++) {

            const transform = pieceTransform(i, pieces);

            herbGeoms.push(

                bakeGeometry(
                    HERB_GEO,
                    {
                        position: transform.position
                            .clone()
                            .setY(0.064),

                        rotation: new THREE.Euler(
                            -Math.PI / 2,
                            0,
                            Math.random() * Math.PI
                        )
                    }
                )

            );

        }

        const herbs = mergedMesh(

            herbGeoms,

            new THREE.MeshStandardMaterial({

                color: dish.garnish.herbColor,

                side: THREE.DoubleSide,

                roughness: 0.75

            })

        );

        meshes.push(herbs);

    }

    //
    // Semillas
    //
    if (dish.garnish?.seedColor) {

        const seedGeoms: THREE.BufferGeometry[] = [];

        for (let i = 0; i < pieces; i++) {

            const transform = pieceTransform(i, pieces);

            for (let j = 0; j < 4; j++) {

                seedGeoms.push(

                    bakeGeometry(
                        SEED_GEO,
                        {
                            position: transform.position.clone().add(

                                new THREE.Vector3(

                                    (Math.random() - 0.5) * 0.02,

                                    0.064,

                                    (Math.random() - 0.5) * 0.02

                                )

                            )
                        }
                    )

                );

            }

        }

        const seeds = mergedMesh(

            seedGeoms,

            new THREE.MeshStandardMaterial({

                color: dish.garnish.seedColor,

                roughness: 0.9

            })

        );

        meshes.push(seeds);

    }

    meshes.forEach(mesh => {

        mesh.castShadow = true;

    });

    return meshes;

}