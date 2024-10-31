export function checkEmail(email) {
    const regExp = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

    return regExp.test(email);
}
