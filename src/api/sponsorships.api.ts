// Supabase
import { supabase } from "../supabase";

// Types
import { HTTPResponseDataT, SponsorshipT } from "../types";

const TABLE = "sponsorships";

export const SPONSORSHIPS_API = {
    getAll: async (
        from: number,
        to: number,
        name: string
    ): Promise<HTTPResponseDataT> => {
        try {
            const {
                data: res,
                count: resTotal,
                error,
            } = await supabase
                .from(TABLE)
                .select("*", { count: "exact" })
                .range(from, to)
                .ilike("name", `%${name}%`);

            if (!res || error)
                return {
                    value: false,
                };

            return {
                data: res,
                totalRecords: resTotal === 0 ? "0" : `${resTotal}`,
                value: true,
            };
        } catch (error) {
            console.error("🚀 ~ error:", error);
            return {
                value: false,
            };
        }
    },

    get: async (id: string): Promise<any> => {
        try {
            const { data: res, error } = await supabase
                .from(TABLE)
                .select()
                .eq("id", id);

            if (error) return false;

            return res[0];
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    create: async (data: SponsorshipT): Promise<string | boolean> => {
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

    getAllWithoutFilters: async (): Promise<any> => {
        try {
            const { data: res, error } = await supabase.from(TABLE).select("*");

            if (!res || error)
                return {
                    value: false,
                };

            return {
                data: res,
                value: true,
            };
        } catch (error) {
            console.error("🚀 ~ error:", error);
            return {
                value: false,
            };
        }
    },

    update: async (
        data: SponsorshipT,
        id: string
    ): Promise<string | boolean> => {
        try {
            const { data: res, error } = await supabase
                .from(TABLE)
                .update(data)
                .eq("id", id)
                .select();

            if (!res || error) return false;

            return res[0].id;
        } catch (error) {
            console.error("🚀 ~ error:", error);
            return false;
        }
    },

    delete: async (id: string): Promise<HTTPResponseDataT> => {
        try {
            const { error } = await supabase.from(TABLE).delete().eq("id", id);

            if (error)
                return {
                    value: false,
                };

            return {
                value: true,
            };
        } catch (error) {
            console.error("🚀 ~ error:", error);
            return {
                value: false,
            };
        }
    },
};
