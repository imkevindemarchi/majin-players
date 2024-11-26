// Supabase
import { supabase } from "../supabase";

// Types
import { TopT } from "../types";

const TABLE = "tops";

export const TOPS_API = {
    getAll: async (id: string): Promise<any> => {
        try {
            const { data: res, error } = await supabase
                .from(TABLE)
                .select("*")
                .eq("playerId", id);

            if (!res || error) return false;

            return res;
        } catch (error) {
            console.error("🚀 ~ error:", error);
            return false;
        }
    },

    create: async (data: TopT): Promise<string | boolean> => {
        try {
            const { data: res, error } = await supabase
                .from(TABLE)
                .insert([data])
                .select();

            if (!res || error) return false;

            return res[0].id;
        } catch (error) {
            console.error("🚀 ~ error:", error);
            return false;
        }
    },
};
