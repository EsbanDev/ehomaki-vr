import * as THREE from "three";
import { PLATE_LAYOUTS } from "./PlateLayouts";

const HEIGHTS = {

    rice: 0.032,

    nori: 0.032,

    filling: 0.0226,

    topping: 0.048

};

function getPiece(
    dishId: string,
    index: number
) {

    switch (dishId) {

        case "acevichado":
            return PLATE_LAYOUTS.acevichado[index];

        case "furai":
            return PLATE_LAYOUTS.furai[index];

        default:
            return PLATE_LAYOUTS.default[index];

    }

}

function createTransform(
    dishId: string,
    index: number,
    height: number
): PieceTransform {

    const piece = getPiece(
        dishId,
        index
    );

    return {

        position: piece.position
            .clone()
            .setY(height),

        rotation: new THREE.Euler(

            (Math.random() - 0.5) * 0.08,

            piece.rotation,

            (Math.random() - 0.5) * 0.08

        )

    };

}

export function riceTransform(
    dishId: string,
    index: number
): PieceTransform {

    return createTransform(

        dishId,

        index,

        HEIGHTS.rice

    );

}

export function noriTransform(
    dishId: string,
    index: number
): PieceTransform {

    return createTransform(

        dishId,

        index,

        HEIGHTS.nori

    );

}

export function fillingTransform(
    dishId: string,
    index: number
): PieceTransform {

    return createTransform(

        dishId,

        index,

        HEIGHTS.filling

    );

}

export function toppingTransform(
    dishId: string,
    index: number
): PieceTransform {

    return createTransform(

        dishId,

        index,

        HEIGHTS.topping

    );

}

export interface PieceTransform {

    position: THREE.Vector3;

    rotation: THREE.Euler;

}