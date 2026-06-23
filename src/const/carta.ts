export const CATEGORIAS = [
    {
        id: "acevichados",
        label: "Acevichados",
        kanji: "酢",
        color: "from-red-950/40 to-transparent",
        items: [
            { slug: "acevichado", nombre: "Acevichado", ingredientes: "Ebi furai y palta cub, con atún y salsa acevichada", img: "/images/menu/acevichado.webp" },
            { slug: "crispy-acevichado", nombre: "Crispy Acevichado", ingredientes: "Sakana furai y palta cub, salsa acevichada", img: "/images/menu/acevichado.webp" },
            { slug: "taco-acevichado", nombre: "Taco Acevichado", ingredientes: "Palta, sakana furai cub de pulpo, salsa acevichada", img: "/images/menu/acevichado.webp" },
            { slug: "combinado-acevichado", nombre: "Combinado Acevichado", ingredientes: "Palta sakana furai, empanizado frito cub, guacamole, salsa acevichada y tare", img: "/images/menu/acevichado.webp" },
        ]
    },
    {
        id: "clasicos",
        label: "Clásicos",
        kanji: "古",
        color: "from-amber-950/40 to-transparent",
        items: [
            { slug: "california", nombre: "California", ingredientes: "Salmón, queso crema y palta cub, con semilla de ajonjolí", img: "/images/menu/furai-roll.webp" },
            { slug: "tuna-roll", nombre: "Tuna Roll", ingredientes: "Atún y palta cub, de ajonjolí negro", img: "/images/menu/seiji.webp" },
            { slug: "veggie-roll", nombre: "Veggie Roll", ingredientes: "Palta y zanahoria cub, en ajonjolí", img: "/images/menu/temaki.webp" },
            { slug: "katana", nombre: "Katana", ingredientes: "Queso crema, palta, sakana furai con el nori por fuera", img: "/images/menu/gaucho.webp" },
            { slug: "tempura-roll", nombre: "Tempura Roll", ingredientes: "Maki arrebozado de sakana furai y queso crema", img: "/images/menu/brasa-roll.webp" },
            { slug: "geisha-roll", nombre: "Geisha Roll", ingredientes: "Palta ebi furai, cub con semilla ajonjolí", img: "/images/menu/chicken-katsu.webp" },
        ]
    },
    {
        id: "nikkei",
        label: "Nikkei Fusion",
        kanji: "融",
        color: "from-orange-950/40 to-transparent",
        items: [
            { slug: "huancaina-roll", nombre: "Huancaína Roll", ingredientes: "Sakana furai y palta cub en salsa huancaína", img: "/images/menu/huancaina-roll.webp" },
            { slug: "gaucho", nombre: "Gaucho", ingredientes: "Lomo tempura, queso crema cub, chimichurri de lomo flameado", img: "/images/menu/gaucho.webp" },
            { slug: "lomo-roll", nombre: "Lomo Roll", ingredientes: "Lomo tempura cub, lomo y salteado de cebolla", img: "/images/menu/anticuchero-roll.webp" },
            { slug: "brasa-roll", nombre: "Brasa Roll", ingredientes: "Pollo furai y palta cub, en salsa de ají amarillo y papas crocantes", img: "/images/menu/brasa-roll.webp" },
            { slug: "anticuchero-roll", nombre: "Anticuchero Roll", ingredientes: "Palta sakana furai cub, atún flameado y salsa anticuchero", img: "/images/menu/anticuchero-roll.webp" },
            { slug: "leche-de-tigre", nombre: "Leche de Tigre", ingredientes: "Ebi furai y palta cub, con pescado blanco y leche de tigre", img: "/images/menu/leche-de-tigre.webp" },
            { slug: "tiradito-roll", nombre: "Tiradito Roll", ingredientes: "Sakana furai y palta cub, con pescado blanco y tiradito de ají amarillo", img: "/images/menu/tiradito-roll.webp" },
            { slug: "chalaquito-roll", nombre: "Chalaquito Roll", ingredientes: "Palta, sakana furai cub, salsa chalaquito", img: "/images/menu/gunkan-salmon.webp" },
        ]
    },
    {
        id: "especiales",
        label: "Especiales",
        kanji: "特",
        color: "from-yellow-950/40 to-transparent",
        items: [
            { slug: "seiji-roll", nombre: "Seiji Roll", ingredientes: "Palta sakana furai arrebozado frito cub, salsa seiji a base de trucha ahumada, piel de salmón crocante y tare", img: "/images/menu/seiji.webp" },
            { slug: "ehomakis-roll", nombre: "Ehomakis Roll", ingredientes: "Salmón, queso crema y ebi furai cub, palta, tenkatsu y salsa tare", img: "/images/menu/temaki.webp" },
            { slug: "new-ehomakis", nombre: "New Ehomakis", ingredientes: "Palta, queso crema y sakana furai cub de alga nori empanizado frito bañado en salsa acevichada con chicharrón de calamar", img: "/images/menu/alitas.webp" },
            { slug: "hokague-roll", nombre: "Hokague Roll", ingredientes: "Sakana, palta cub nori empanizado y frito con salmón spicy negui kiwicha", img: "/images/menu/alitas-bbq.webp" },
            { slug: "miyazaki", nombre: "Miyazaki", ingredientes: "Sakana furai y palta cub, chimichurri tiradito de rocoto coronado con calamar", img: "/images/menu/alitas-crispy.webp" },
            { slug: "tigre-crunch", nombre: "Tigre Crunch", ingredientes: "Ebi furai, palta, empanizado frito cub, leche de tigre", img: "/images/menu/acevichado.webp" },
        ]
    },
    {
        id: "salmon",
        label: "Salmón & Atún",
        kanji: "鮭",
        color: "from-rose-950/40 to-transparent",
        items: [
            { slug: "ninja-roll", nombre: "Ninja Roll", ingredientes: "Ebi furai y queso crema cub, salmón flameado", img: "/images/menu/furai-roll.webp" },
            { slug: "kioto", nombre: "Kioto", ingredientes: "Ebi furai y palta cub, con salmón, salsa spicy flameado", img: "/images/menu/seiji.webp" },
            { slug: "furai-roll", nombre: "Furai Roll", ingredientes: "Maki frito de salmón, queso crema y palta", img: "/images/menu/furai-roll.webp" },
            { slug: "inka-maki", nombre: "Inka Maki", ingredientes: "Salmón ebi furai y palta cub, con semilla de ajonjolí", img: "/images/menu/gaucho.webp" },
            { slug: "tartar-de-salmon", nombre: "Tartar de Salmón", ingredientes: "Palta, sakana furai cub, tartar de salmón", img: "/images/menu/brasa-roll.webp" },
            { slug: "tartar-de-atun", nombre: "Tartar de Atún", ingredientes: "Sakana furai y palta cub, tartar de atún", img: "/images/menu/chicken-katsu.webp" },
            { slug: "samurai-roll", nombre: "Samurai Roll", ingredientes: "Atún y palta cub, pescado blanco y tiradito nikkei", img: "/images/menu/temaki.webp" },
            { slug: "spicy-tuna", nombre: "Spicy Tuna", ingredientes: "Atún y palta cub, atún y salsa spicy", img: "/images/menu/gunkan-salmon.webp" },
            { slug: "maya-roll", nombre: "Maya Roll", ingredientes: "Atún, lechuga y palta, cubierto con nori bañado en salsa ponzu", img: "/images/menu/alitas.webp" },
            { slug: "new-california", nombre: "New California", ingredientes: "Palta, salmón y eby furai cub, semillas de kiwicha", img: "/images/menu/alitas-bbq.webp" },
        ]
    },
    {
        id: "mar",
        label: "Frutos del Mar",
        kanji: "海",
        color: "from-cyan-950/40 to-transparent",
        items: [
            { slug: "tartar-de-pulpo", nombre: "Tartar de Pulpo", ingredientes: "Sakana furai y palta cub, tartar de pulpo", img: "/images/menu/furai-roll.webp" },
            { slug: "tartar-de-langostino", nombre: "Tartar de Langostino", ingredientes: "Sakana furai y palta cub, tartar de langostino crocante", img: "/images/menu/seiji.webp" },
            { slug: "ryu-maki", nombre: "Ryu Maki", ingredientes: "Sakana furai y palta cub, con chimichurri de pulpo", img: "/images/menu/gaucho.webp" },
            { slug: "jalea-roll", nombre: "Jalea Roll", ingredientes: "Ebi furai y palta cub, chicharrón de calamar", img: "/images/menu/brasa-roll.webp" },
            { slug: "olivo-roll", nombre: "Olivo Roll", ingredientes: "Ebi furai, palta cub, pulpo al olivo", img: "/images/menu/chicken-katsu.webp" },
            { slug: "kani-flama", nombre: "Kani Flama", ingredientes: "Ebi furai y palta cub, con crema de cangrejo flameado", img: "/images/menu/temaki.webp" },
            { slug: "ebiten", nombre: "Ebiten", ingredientes: "Ebi furai y queso crema cub, en palta y salsa tare", img: "/images/menu/gunkan-salmon.webp" },
            { slug: "hot-roll", nombre: "Hot Roll", ingredientes: "Sakana furai y palta cub, pescado blanco y tiradito de rocoto", img: "/images/menu/alitas.webp" },
            { slug: "hiroshima", nombre: "Hiroshima", ingredientes: "Sakana furai y palta cub, cebolla china y salsa spicy", img: "/images/menu/alitas-bbq.webp" },
            { slug: "pikoso-roll", nombre: "Pikoso Roll", ingredientes: "Ebi furai y palta cub, atún y salsa pikoso", img: "/images/menu/alitas-crispy.webp" },
            { slug: "miami-roll", nombre: "Miami Roll", ingredientes: "Palta, eby furai cub, atún con salsa Miami, camotes al hilo", img: "/images/menu/acevichado.webp" },
        ]
    },
    {
        id: "creativos",
        label: "Creativos",
        kanji: "創",
        color: "from-purple-950/40 to-transparent",
        items: [
            { slug: "pizza-roll", nombre: "Pizza Roll", ingredientes: "Ebi furai, queso crema y palta cub, en salsa pizzera", img: "/images/menu/furai-roll.webp" },
            { slug: "guacamole-roll", nombre: "Güacamole Roll", ingredientes: "Pollo furai y queso crema cub, en guacamole", img: "/images/menu/seiji.webp" },
            { slug: "sakura-roll", nombre: "Sakura Roll", ingredientes: "Sakana furai, queso crema y plátano cub con ajonjolí", img: "/images/menu/gaucho.webp" },
            { slug: "banana-roll", nombre: "Banana Roll", ingredientes: "Plátano y queso crema cub, plátano acaramelado y salsa maracuyá", img: "/images/menu/brasa-roll.webp" },
            { slug: "tutti-frutti", nombre: "Tutti Frutti", ingredientes: "Plátano, queso crema cub, con mango y salsa de maracuyá", img: "/images/menu/chicken-katsu.webp" },
            { slug: "caribe-roll", nombre: "Caribe Roll", ingredientes: "Queso crema y plátano empanizado y frito cub, salsa de maracuyá", img: "/images/menu/temaki.webp" },
            { slug: "mozarella", nombre: "Mozarella", ingredientes: "Pollo furai, palta cub, queso mozzarella flameado", img: "/images/menu/gunkan-salmon.webp" },
            { slug: "tequeno-roll", nombre: "Tequeño Roll", ingredientes: "Pollo furai, queso crema cub, wantán frito y guacamole", img: "/images/menu/alitas.webp" },
        ]
    },
    {
        id: "crispys",
        label: "Crispys & Fritos",
        kanji: "揚",
        color: "from-yellow-950/40 to-transparent",
        items: [
            { slug: "tokio-roll", nombre: "Tokio Roll", ingredientes: "Atún, queso crema, palta arrebozado y frito", img: "/images/menu/alitas-bbq.webp" },
            { slug: "crispy-roll", nombre: "Crispy Roll", ingredientes: "Ebi furai, queso crema, palta cub, tenkatsu y salsa maracuyá", img: "/images/menu/alitas-crispy.webp" },
            { slug: "season-roll", nombre: "Season Roll", ingredientes: "Salmón, eby furai y queso crema cub, con palta, ajonjolí y salsa taré", img: "/images/menu/acevichado.webp" },
            { slug: "new-ebitem", nombre: "New Ebitem", ingredientes: "Ebi furai y queso crema cub, láminas de palta, semillas de kiwicha, salsa de maracuyá", img: "/images/menu/furai-roll.webp" },
        ]
    },
    {
        id: "complementos",
        label: "Complementos",
        kanji: "副",
        color: "from-stone-950/40 to-transparent",
        items: [
            { slug: "sakana-furai", nombre: "Sakana Furai", ingredientes: "Filete de pescado frito en tempura, crujiente por fuera y jugoso por dentro", img: "/images/menu/alitas.webp", price: 28 },
            { slug: "chiken-katsu", nombre: "Chiken Katsu", ingredientes: "Filete de pollo empanizado y frito al estilo japonés", img: "/images/menu/chicken-katsu.webp", price: 28 },
            { slug: "yarimeshi", nombre: "Yarimeshi", ingredientes: "Arroz salteado al wok estilo japonés", img: "/images/menu/gunkan-salmon.webp", price: 25 },
            { slug: "eby-furai", nombre: "Eby Furai", ingredientes: "Langostinos en tempura, crujientes y jugosos", img: "/images/menu/alitas.webp", price: 28, pieces: 10 },
            { slug: "harumaki", nombre: "Harumaki", ingredientes: "Rollitos primavera crujientes rellenos al estilo nikkei", img: "/images/menu/temaki.webp", price: 25, pieces: 8 },
            { slug: "alitas-teriyaki", nombre: "Alitas Teriyaki", ingredientes: "Alitas bañadas en salsa teriyaki dulce y brillante", img: "/images/menu/alitas.webp", price: 28, pieces: 10 },
            { slug: "alitas-acevichadas", nombre: "Alitas Acevichadas", ingredientes: "Alitas bañadas en nuestra salsa acevichada con toque cítrico", img: "/images/menu/alitas.webp", price: 28, pieces: 10 },
            { slug: "alitas-crispy", nombre: "Alitas Crispy", ingredientes: "Alitas empanizadas extra crujientes con salsa a elección", img: "/images/menu/alitas-crispy.webp", price: 28, pieces: 10 },
            { slug: "alitas-bbq", nombre: "Alitas BBQ", ingredientes: "Alitas glaseadas en salsa BBQ con toque nikkei", img: "/images/menu/alitas-bbq.webp", price: 28, pieces: 10 },
            { slug: "alitas-maracuya", nombre: "Alitas Maracuyá", ingredientes: "Alitas bañadas en reducción de maracuyá agridulce", img: "/images/menu/alitas.webp", price: 28, pieces: 10 },
        ]
    },
];