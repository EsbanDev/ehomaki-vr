import * as THREE from "three";
import type { Dish } from "@/types/experienciaVR";

import { bakeGeometry, mergedMesh } from "./GeometryUtils";

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

    const layout = dish.layout;

    //
    // Salsa
    //
    if (dish.garnish?.drizzleColor) {

        const drizzleGeoms: THREE.BufferGeometry[] = [];

        for (const transform of layout) {

            drizzleGeoms.push(

                bakeGeometry(
                    DRIZZLE_SEG_GEO,
                    {
                        position: transform.position.clone().add(
                            new THREE.Vector3(0, 0.061, 0)
                        ),

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

        for (const transform of layout) {

            herbGeoms.push(

                bakeGeometry(
                    HERB_GEO,
                    {
                        position: transform.position.clone().add(
                            new THREE.Vector3(0, 0.064, 0)
                        ),

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

        for (const transform of layout) {

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