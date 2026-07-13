import * as THREE from "three";

export function distortCylinder(

    geometry: THREE.BufferGeometry,

    amount = 0.0015

) {

    const pos = geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {

        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);

        const angle = Math.atan2(z, x);

        const wave =
            Math.sin(angle * 5.7) * amount +
            Math.cos(angle * 3.3) * amount * 0.8;

        const r = Math.sqrt(x * x + z * z);

        if (r < 0.0001)
            continue;

        const scale = (r + wave) / r;

        pos.setXYZ(

            i,

            x * scale,

            y,

            z * scale

        );

    }

    pos.needsUpdate = true;

    geometry.computeVertexNormals();

}