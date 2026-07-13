import * as THREE from "three";
import { mergedMesh, bakeGeometry } from "./GeometryUtils";
import { riceTransform } from "./Layout";
import { distortCylinder } from "./Noise";
import { createRiceGrains } from "./Grain";
import type { Dish } from "@/types/experienciaVR";

const RICE_GEO = new THREE.CylinderGeometry(
    0.033,
    0.030,
    0.044,
    28,
    5
);

const POS = RICE_GEO.attributes.position;

distortCylinder(
    RICE_GEO,
    0.0012
);

// Dar volumen irregular al arroz
for (let i = 0; i < POS.count; i++) {

    const x = POS.getX(i);
    const y = POS.getY(i);
    const z = POS.getZ(i);

    const bulge = 1 - Math.abs(y) / 0.022;

    const scale = 1 + bulge * 0.05;

    POS.setXYZ(
        i,
        x * scale,
        y,
        z * scale
    );

}

POS.needsUpdate = true;
RICE_GEO.computeVertexNormals();

export function createRice(
    dish: Dish
) {

    const riceGeoms: THREE.BufferGeometry[] = [];

    // Cada iteración representa un maki del plato
    const pieces = 6;

    for (let i = 0; i < pieces; i++) {

        const t = riceTransform(
            dish.id,
            i,
            pieces
        );

        // Pequeñas imperfecciones naturales
        t.position.x += (Math.random() - 0.5) * 0.004;
        t.position.z += (Math.random() - 0.5) * 0.004;
        t.position.y += (Math.random() - 0.5) * 0.0015;

        t.rotation.y += (Math.random() - 0.5) * 0.08;

        riceGeoms.push(

            bakeGeometry(
                RICE_GEO,
                t
            )

        );

    }

    // Granos pequeños adicionales
    const grains = createRiceGrains();

    for (const g of grains) {

        const grainPosition = new THREE.Vector3(

            (Math.random() - 0.5) * 0.018,

            0.045 + Math.random() * 0.003,

            (Math.random() - 0.5) * 0.018

        );

        const grainRotation = new THREE.Euler(

            Math.random() * Math.PI,

            Math.random() * Math.PI,

            Math.random() * Math.PI

        );

        g.applyMatrix4(

            new THREE.Matrix4().compose(

                grainPosition,

                new THREE.Quaternion().setFromEuler(
                    grainRotation
                ),

                new THREE.Vector3(
                    1,
                    1,
                    1
                )

            )

        );

        riceGeoms.push(g);

    }

    const rice = mergedMesh(

        riceGeoms,

        new THREE.MeshStandardMaterial({

            color: dish.riceColor ?? 0xf6f3eb,

            roughness: 0.82,

            metalness: 0,

            envMapIntensity: 0.2

        })

    );

    rice.castShadow = true;

    return rice;

}