import * as THREE from "three";
import type { Dish } from "@/types/experienciaVR";

import { createPlateBase } from "./Plate";
import { createRice } from "./Rice";
import { createNori } from "./Nori";
import { createFillings } from "./Fillings";
import { createToppings } from "./toppings/index";
import { createGarnish } from "./Garnish";

export function buildPlate(dish: Dish): THREE.Group {

    const group = createPlateBase();

    group.userData.dishId = dish.id;

    //
    // Base
    //

    group.add(
        createRice(dish)
    );

    group.add(
        createNori(dish)
    );

    //
    // Interior
    //

    group.add(
        ...createFillings(dish)
    );

    //
    // Topping
    //

    const topping = createToppings(dish);

    if (topping) {

        group.add(topping);

    }

    //
    // Decoración
    //

    const garnish = createGarnish(dish);

    garnish.forEach(mesh => {

        group.add(mesh);

    });

    return group;

}