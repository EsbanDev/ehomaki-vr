import * as THREE from "three";
import { bakeGeometry, mergedMesh } from "./GeometryUtils";
import { distortCylinder } from "./Noise";
import { noriTransform } from "./Layout";
import type { Dish } from "@/types/experienciaVR";

const NORI_GEO = new THREE.CylinderGeometry(
    0.034,
    0.033,
    0.046,
    32,
    6,
    true
);

const pos = NORI_GEO.attributes.position;

distortCylinder(
    NORI_GEO,
    0.0018
);

for (let i = 0; i < pos.count; i++) {

    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const angle = Math.atan2(z, x);

    const wave =
        Math.sin(angle * 6) * 0.0009 +
        Math.cos(angle * 3) * 0.0006;

    const r = Math.sqrt(x * x + z * z);

    const scale = (r + wave) / r;

    pos.setXYZ(
        i,
        x * scale,
        y,
        z * scale
    );

}

pos.needsUpdate = true;
NORI_GEO.computeVertexNormals();

const NORI_MATERIAL = new THREE.MeshStandardMaterial({

    color: 0x20261d,

    roughness: 0.95,

    metalness: 0,

    side: THREE.DoubleSide

});

export function createNori(
    dish: Dish
) {

    const geoms: THREE.BufferGeometry[] = [];

    // Cada iteración representa un maki del plato
    const pieces = 6;

    for (let i = 0; i < pieces; i++) {

        const t = noriTransform(
            dish.id,
            i,
            pieces
        );

        t.position.x += (Math.random() - 0.5) * 0.003;
        t.position.z += (Math.random() - 0.5) * 0.003;
        t.position.y += (Math.random() - 0.5) * 0.001;

        t.rotation.y += (Math.random() - 0.5) * 0.06;

        geoms.push(

            bakeGeometry(
                NORI_GEO,
                t
            )

        );

    }

    const mesh = mergedMesh(
        geoms,
        NORI_MATERIAL
    );

    mesh.castShadow = true;

    return mesh;

}