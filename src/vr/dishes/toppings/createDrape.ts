import * as THREE from "three";
import type { Dish } from "@/types/experienciaVR";

import { bakeGeometry, mergedMesh } from "../GeometryUtils";
import { toppingTransform } from "../Layout";

const DRAPE_CAP_GEO = new THREE.SphereGeometry(
    0.03,
    18,
    12,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
);

const pos = DRAPE_CAP_GEO.attributes.position;

// Bordes ligeramente irregulares
for (let i = 0; i < pos.count; i++) {

    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const angle = Math.atan2(z, x);
    const r = Math.sqrt(x * x + z * z);

    if (r > 0.0001) {

        const wave =
            Math.sin(angle * 4) * 0.001 +
            Math.cos(angle * 7) * 0.0006;

        const scale = (r + wave) / r;

        pos.setXYZ(
            i,
            x * scale,
            y,
            z * scale
        );

    }

}

pos.needsUpdate = true;
DRAPE_CAP_GEO.computeVertexNormals();

export function createDrape(dish: Dish) {

    const geoms: THREE.BufferGeometry[] = [];

    const pieces = 6;

    for (let i = 0; i < pieces; i++) {

        const transform = toppingTransform(
            dish.id,
            i,
            pieces
        );

        transform.position.x += (Math.random() - 0.5) * 0.002;
        transform.position.z += (Math.random() - 0.5) * 0.002;

        geoms.push(

            bakeGeometry(
                DRAPE_CAP_GEO,
                {
                    position: transform.position.clone(),

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

            roughness: 0.5,

            metalness: 0

        })

    );

    mesh.castShadow = true;

    return mesh;

}