// Supabase
import { supabase } from "../supabase";

export const AUTH_API = {
    login: async (email, password) => {
        try {
            const res = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (!res || res.error) return false;

            return res.data.session;
        } catch (error) {
            console.error("🚀 ~ error:", error);
            return false;
        }
    },

    checkSession: async () => {
        try {
            const res = await supabase.auth.refreshSession();
            if (!res || res.error) return false;

            return res.data.session;
        } catch (error) {
            console.error("🚀 ~ error:", error);
            return false;
        }
    },
};
