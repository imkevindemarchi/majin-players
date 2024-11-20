const EMAIL_REG_EXP = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

type ErrorType = {
    value: boolean;
    message?: string;
};

export function checkEmail(email: string): ErrorType {
    if (EMAIL_REG_EXP.test(email)) return { value: false };
    else
        return {
            value: true,
            message: "E-mail errata",
        };
}
