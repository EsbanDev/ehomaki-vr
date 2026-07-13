import * as THREE from "three";

const PLATE_GEO = new THREE.CylinderGeometry(
    0.16,
    0.17,
    0.015,
    36
);

const WASABI_GEO = new THREE.SphereGeometry(
    0.017,
    10,
    10
);

const GINGER_GEO = new THREE.CylinderGeometry(
    0.03,
    0.03,
    0.004,
    16
);

const PLATE_MATERIAL = new THREE.MeshStandardMaterial({
    color: 0x141414,
    roughness: 0.25,
    metalness: 0.15
});

const WASABI_MATERIAL = new THREE.MeshStandardMaterial({
    color: 0x8fae4e,
    roughness: 0.6
});

const GINGER_MATERIAL = new THREE.MeshStandardMaterial({
    color: 0xe8a3b0,
    roughness: 0.5
});

export function createPlateBase(): THREE.Group {

    const group = new THREE.Group();

    const plate = new THREE.Mesh(
        PLATE_GEO,
        PLATE_MATERIAL
    );

    plate.receiveShadow = true;

    group.add(plate);

    const wasabi = new THREE.Mesh(
        WASABI_GEO,
        WASABI_MATERIAL
    );

    wasabi.position.set(
        -0.12,
        0.02,
        0.12
    );

    group.add(wasabi);

    const ginger = new THREE.Mesh(
        GINGER_GEO,
        GINGER_MATERIAL
    );

    ginger.position.set(
        0.12,
        0.016,
        0.12
    );

    group.add(ginger);

    return group;

}