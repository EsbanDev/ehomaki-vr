import * as THREE from "three";
import type { Dish } from "@/types/experienciaVR";

export interface ToppingBuilder {
    (dish: Dish): THREE.Mesh | null;
}