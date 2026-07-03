import type { Session, User } from "@supabase/supabase-js";

export interface AuthResult {
    user: User | null;
    session: Session | null;
}