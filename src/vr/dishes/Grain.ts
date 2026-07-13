import * as THREE from "three";

const GRAIN_GEO = new THREE.SphereGeometry(
    0.0019,
    6,
    6
);

// Dar forma de grano de arroz
GRAIN_GEO.scale(
    1.0,
    1.5,
    0.8
);

export function createRiceGrains() {

    const geoms: THREE.BufferGeometry[] = [];

    const count = 18;

    for (let i = 0; i < count; i++) {

        // Distribución aleatoria sobre la superficie
        const angle = Math.random() * Math.PI * 2;

        const radius =
            0.026 +
            Math.random() * 0.007;

        const x = Math.cos(angle) * radius;

        const z = Math.sin(angle) * radius;

        const y =
            (Math.random() - 0.5) * 0.024;

        const g = GRAIN_GEO.clone();

        g.applyMatrix4(

            new THREE.Matrix4().compose(

                new THREE.Vector3(
                    x,
                    y,
                    z
                ),

                new THREE.Quaternion().setFromEuler(

                    new THREE.Euler(

                        Math.random() * Math.PI,

                        Math.random() * Math.PI,

                        Math.random() * Math.PI

                    )

                ),

                new THREE.Vector3(
                    1,
                    1,
                    1
                )

            )

        );

        geoms.push(g);

    }

    return geoms;

}