export interface Combo {
    id: number;
    slug: string;
    name: string;
    type: 'tabla' | 'bento' | 'combo';

    price: number;
    image: string;

    shortDescription: string;
    description: string;

    portion?: number;

    canChooseVarieties?: boolean;
    varietiesCount?: number;

    includes: string[];

    extras?: string[];

    badge?: string;
}

export const COMBOS: Combo[] = [
    {
        id: 1,
        slug: "tabla-1",
        name: "Tabla #1",
        type: "tabla",
        price: 35,
        image: "/images/combos/tabla1.webp",
        shortDescription: "20 unidades, 2 variedades + bebida",
        description: "Tabla 1 - 20 unidades, 2 variedades + bebida",
        portion: 20,
        canChooseVarieties: true,
        varietiesCount: 2,
        includes: ["20 unidades de sushi", "2 variedades a elección", "Bebida"],
    },
    {
        id: 2,
        slug: "tabla-2",
        name: "Tabla #2",
        type: "tabla",
        price: 50,
        image: "/images/combos/tabla2.webp",
        shortDescription: "30 unidades, 3 variedades + bebida",
        description: "Tabla 2 - 30 unidades, 3 variedades + bebida",
        portion: 30,
        canChooseVarieties: true,
        varietiesCount: 3,
        includes: ["30 unidades de sushi", "3 variedades a elección", "Bebida"],
    },
    {
        id: 3,
        slug: "tabla-3",
        name: "Tabla #3",
        type: "tabla",
        price: 80,
        image: "/images/combos/tabla3.webp",
        shortDescription: "50 unidades, 5 variedades + bebida + 4 alitas",
        description: "Tabla 3 - 50 unidades, 5 variedades + bebida + 4 alitas teriyaki",
        portion: 50,
        canChooseVarieties: true,
        varietiesCount: 5,
        includes: ["50 unidades de sushi", "5 variedades a elección", "Bebida", "4 alitas teriyaki"],
    },
    {
        id: 4,
        slug: "tabla-4",
        name: "Tabla #4",
        type: "tabla",
        price: 110,
        image: "/images/combos/tabla4.webp",
        shortDescription: "70 unidades, 7 variedades + bebida",
        description: "Tabla 4 - 70 unidades, 7 variedades + bebida",
        portion: 70,
        canChooseVarieties: true,
        varietiesCount: 7,
        includes: ["70 unidades de sushi", "7 variedades a elección", "Bebida"],
    },
    {
        id: 5,
        slug: "tabla-5",
        name: "Tabla #5",
        type: "tabla",
        price: 140,
        image: "/images/combos/tabla5.webp",
        shortDescription: "90 unidades, 9 variedades + bebida",
        description: "Tabla 5 - 90 unidades, 9 variedades + bebida",
        portion: 90,
        canChooseVarieties: true,
        varietiesCount: 9,
        includes: ["90 unidades de sushi", "9 variedades a elección", "Bebida"],
    },
    {
        id: 6,
        slug: "tabla-6",
        name: "Tabla #6",
        type: "tabla",
        price: 180,
        image: "/images/combos/tabla6.webp",
        shortDescription: "120 unidades, 12 variedades + bebida",
        description: "Tabla 6 - 120 unidades, 12 variedades + bebida",
        portion: 120,
        canChooseVarieties: true,
        varietiesCount: 12,
        includes: ["120 unidades de sushi", "12 variedades a elección", "Bebida"],
    },
    {
        id: 7,
        slug: "bento-box-1",
        name: "Bento Box 1",
        type: "bento",
        price: 38,
        image: "/images/combos/bento_box1.webp",
        shortDescription: "Pollo empanizado, Maki, Alitas, Yakimeshi y Gaseosa",
        description: "Bento Box 1 - Pollo empanizado, Maki California, Alitas Teriyaki, Yakimeshi + Gaseosa de 300ml",
        canChooseVarieties: false,
        includes: ["Pollo empanizado", "Maki California", "Alitas Teriyaki", "Yakimeshi", "Gaseosa de 300ml"],
    },
    {
        id: 8,
        slug: "bento-box-2",
        name: "Bento Box 2",
        type: "bento",
        price: 38,
        image: "/images/combos/bento_box2.webp",
        shortDescription: "Pescado empanizado, Maki, Alitas, Tempura y Gaseosa",
        description: "Bento Box 2 - Pescado empanizado, Maki California, Alitas Teriyaki, Tempura de Verduras + Gaseosa de 300ml",
        canChooseVarieties: false,
        includes: ["Pescado empanizado", "Maki California", "Alitas Teriyaki", "Tempura de Verduras", "Gaseosa de 300ml"],
    },
    {
        id: 9,
        slug: "combo-familiar",
        name: "Combo Familiar",
        type: "combo",
        price: 140,
        image: "/images/combos/combo_familiar.webp",
        shortDescription: "60 unidades, 6 variedades, Alitas, Yakimeshi, Harumaki + Chicha",
        description: "Combo Familiar - 60 unidades, 6 variedades, 8 Alitas Teriyaki, Yakimeshi, 10 Harumaki + 1L de Chicha",
        portion: 60,
        canChooseVarieties: true,
        varietiesCount: 6,
        includes: ["60 unidades de sushi", "6 variedades a elección", "8 Alitas Teriyaki", "Yakimeshi", "10 Harumaki", "1L de Chicha"],
        badge: "Familiar",
    }
];