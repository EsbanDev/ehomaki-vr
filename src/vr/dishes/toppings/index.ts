import type { Dish } from "@/types/experienciaVR";

import { createDrape } from "./createDrape";
import { createSauceCap } from "./createSauceCap";
import { createCrispy } from "./createCrispy";

const builders = {
    drape: createDrape,
    sauceCap: createSauceCap,
    crispy: createCrispy
} as const;

export function createToppings(dish: Dish) {

    if (!dish.topping)
        return null;

    const builder = builders[dish.topping.style];

    return builder ? builder(dish) : null;

}