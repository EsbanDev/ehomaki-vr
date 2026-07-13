import * as THREE from "three";
import type { Dish } from "@/types/experienciaVR";

import { bakeGeometry, mergedMesh } from "./GeometryUtils";
import { fillingTransform } from "./Layout";

const FILL_OUTER_GEO = new THREE.CircleGeometry(0.020, 24);
const FILL_INNER_GEO = new THREE.CircleGeometry(0.011, 20);

function distortCircle(
    geo: THREE.CircleGeometry,
    amount: number
) {

    const pos = geo.attributes.position;

    for (let i = 1; i < pos.count; i++) {

        const x = pos.getX(i);
        const y = pos.getY(i);

        const angle = Math.atan2(y, x);

        const radius = Math.sqrt(x * x + y * y);

        const noise =
            Math.sin(angle * 5) * amount +
            Math.cos(angle * 3) * amount * 0.6;

        const scale = (radius + noise) / radius;

        pos.setXY(
            i,
            x * scale,
            y * scale
        );

    }

    pos.needsUpdate = true;

    geo.computeVertexNormals();

}

distortCircle(
    FILL_OUTER_GEO,
    0.0008
);

distortCircle(
    FILL_INNER_GEO,
    0.0005
);

export function createFillings(
    dish: Dish
): THREE.Mesh[] {

    const outerGeoms: THREE.BufferGeometry[] = [];
    const innerGeoms: THREE.BufferGeometry[] = [];

    const pieces = 6;

    for (let i = 0; i < pieces; i++) {

        const transform = fillingTransform(
            dish.id,
            i,
            pieces
        );

        const offsetX = (Math.random() - 0.5) * 0.0015;
        const offsetZ = (Math.random() - 0.5) * 0.0015;

        const rotation =
            (Math.random() - 0.5) * 0.12;

        outerGeoms.push(

            bakeGeometry(

                FILL_OUTER_GEO,

                {

                    position: transform.position
                        .clone()
                        .add(

                            new THREE.Vector3(

                                offsetX,
                                0,
                                offsetZ

                            )

                        ),

                    rotation: new THREE.Euler(

                        -Math.PI / 2,

                        rotation,

                        0

                    )

                }

            )

        );

        if (dish.fillingColor2) {

            innerGeoms.push(

                bakeGeometry(

                    FILL_INNER_GEO,

                    {

                        position: transform.position
                            .clone()
                            .add(

                                new THREE.Vector3(

                                    offsetX * 0.5,

                                    0.0002,

                                    offsetZ * 0.5

                                )

                            ),

                        rotation: new THREE.Euler(

                            -Math.PI / 2,

                            rotation,

                            0

                        )

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

                roughness: 0.55,

                metalness: 0

            })

        )

    );

    if (innerGeoms.length > 0) {

        meshes.push(

            mergedMesh(

                innerGeoms,

                new THREE.MeshStandardMaterial({

                    color: dish.fillingColor2!,

                    roughness: 0.55,

                    metalness: 0

                })

            )

        );

    }

    meshes.forEach(mesh => {

        mesh.castShadow = true;

    });

    return meshes;

}