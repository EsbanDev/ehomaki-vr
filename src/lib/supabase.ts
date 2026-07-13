import { createClient } from "@supabase/supabase-js";
import { getOrCreateGuestId } from "./utils";

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  {
    global: {
      headers: { "x-guest-id": getOrCreateGuestId() },
    },
  }
);