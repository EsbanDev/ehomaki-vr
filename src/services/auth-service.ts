import { supabase } from "../lib/supabase";
import type { AuthResult } from "../types/auth.types";

/**
 * Inicia sesión con email y contraseña.
 * Lanza error si las credenciales son inválidas.
 */
export async function signIn(email: string, password: string): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(`Error al iniciar sesión: ${error.message}`);
    }

    return { user: data.user, session: data.session };
}

/**
 * Cierra la sesión activa.
 */
export async function signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(`Error al cerrar sesión: ${error.message}`);
    }
}

/**
 * Obtiene la sesión actual, si existe.
 * Útil para verificar al cargar la página si el admin ya está logueado.
 */
export async function getSession(): Promise<AuthResult> {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw new Error(`Error al obtener la sesión: ${error.message}`);
    }

    return { user: data.session?.user ?? null, session: data.session };
}

/**
 * Suscribe un callback a los cambios de sesión (login/logout).
 * Retorna la función para cancelar la suscripción.
 */
export function onAuthStateChange(callback: (session: AuthResult) => void): () => void {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        callback({ user: session?.user ?? null, session });
    });

    return () => data.subscription.unsubscribe();
}