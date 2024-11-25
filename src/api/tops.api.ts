// Supabase
import { supabase } from "../supabase";

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
};
