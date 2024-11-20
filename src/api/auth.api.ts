// Supabase
import { supabase } from "../supabase";

type HTTPResponseDataType = {
    data: any;
    value: boolean;
};

export const AUTH_API = {
    login: async (
        email: string,
        password: string
    ): Promise<HTTPResponseDataType> => {
        try {
            const res = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            return {
                data: res.data.session,
                value: true,
            };
        } catch (error) {
            console.error("🚀 ~ error:", error);
            return {
                data: null,
                value: false,
            };
        }
    },

    checkSession: async (): Promise<HTTPResponseDataType> => {
        try {
            const res = await supabase.auth.refreshSession();

            return {
                data: res.data.session,
                value: true,
            };
        } catch (error) {
            console.error("🚀 ~ error:", error);
            return {
                data: null,
                value: false,
            };
        }
    },
};
