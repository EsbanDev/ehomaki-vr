import * as THREE from "three";

export interface PlatePiece {

    position: THREE.Vector3;

    rotation: number;

}

function p(
    x: number,
    z: number,
    rot = 0
): PlatePiece {

    return {

        position: new THREE.Vector3(x, 0, z),

        rotation: rot

    };

}

export const PLATE_LAYOUTS = {

    default: [

        p(-0.07,-0.06,-0.08),
        p( 0.00,-0.07, 0.02),
        p( 0.07,-0.05, 0.09),

        p(-0.08, 0.02,-0.03),
        p( 0.00, 0.01, 0.04),
        p( 0.08, 0.02,-0.06),

        p(-0.05, 0.08, 0.05),
        p( 0.05, 0.09,-0.02)

    ],

    acevichado: [

        p(-0.08,-0.05,-0.05),
        p( 0.00,-0.06, 0.04),
        p( 0.08,-0.05, 0.06),

        p(-0.06, 0.03, 0.08),
        p( 0.03, 0.01,-0.04),
        p( 0.10, 0.03,-0.08),

        p(-0.03, 0.09, 0.03),
        p( 0.07, 0.10,-0.03)

    ],

    furai: [

        p(-0.09,-0.04,0.02),
        p(-0.01,-0.05,-0.05),
        p( 0.08,-0.03,0.08),

        p(-0.08,0.04,-0.07),
        p(0.01,0.02,0.02),
        p(0.09,0.04,-0.02),

        p(-0.02,0.10,0.06),
        p(0.06,0.09,-0.08)

    ]

};