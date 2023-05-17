import { fromAsciiToBase64, fromBase64ToAscii, getCookie, setCookie } from "../core";

export const getAuthToken = () => {
    try {
        const t = getCookie("token");
        if (t && t.length) {
            return fromBase64ToAscii(t);
        }
    } catch (e) {
        console.error(e)
    }
    return null;
}

export const setAuthToken = (token: any) => {
    if (!token || token.length <= 0) return;
    try {
        setCookie("token", fromAsciiToBase64(token))
    } catch (e) {
        console.error(e)
    }
}

export const clearAuth = () => {
    setCookie("token", "", 0);
    setCookie("u", "", 0);
}
