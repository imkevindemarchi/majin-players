// Supabase
import { supabase } from "../supabase";

// Types
import { PlayerT } from "../types";

const TABLE = "players";

type HTTPResponseDataType = {
    data?: PlayerT[];
    totalRecords?: number | null;
    value: boolean;
};

export const PLAYERS_API = {
    getAll: async (
        from: number,
        to: number,
        name: string,
        surname: string
    ): Promise<HTTPResponseDataType> => {
        try {
            const {
                data: res,
                count: resTotal,
                error,
            } = await supabase
                .from(TABLE)
                .select("*", { count: "exact" })
                .range(from, to)
                .ilike("name", `%${name}%`)
                .ilike("surname", `%${surname}%`);

            if (!res || error)
                return {
                    value: false,
                };

            return {
                data: res,
                totalRecords: resTotal,
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
