import { Buffer } from "buffer"
export const extractCookie = (cookie: string, name: string) => {
  const pattern = new RegExp(`${name}=([^;]+)`);
  try {
    const matched = cookie.match(pattern);
    return matched ? matched[1] : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
export const setCookie = (name: string, value: any, days: number = 7) => {
  if (typeof window === "undefined") return;
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (JSON.stringify(value) || "") + expires + "; path=/";
}
export const getCookie = (name: string) => {
  if (typeof window === "undefined") return;
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
  }
  return null;
}
export const eraseCookie = (name: string) => {
  if (typeof window === "undefined") return;
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const setLocalKV = (name: string, value: any, days: number = 7) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(name, JSON.stringify(value));
  }
}
export const getLocalKV = (name: string) => {
  if (typeof localStorage !== "undefined") {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  }
  return null;
}
export const eraseLocalKV = (name: string) => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(name);
  }
}

export const fromBase64ToAscii = (str: string) => {
  return Buffer.from(str, "base64").toString("ascii")
}
export const fromAsciiToBase64 = (str: string) => {
  return Buffer.from(str).toString("base64")
}

export const sleep = async (ms: number) => {
  return new Promise(res => {
    setTimeout(res, ms)
  })
}

export const trimStr = (str: string, opts?: any) => {
  const { length=20, appendSuffix = true, suffix = "..." } = opts || {};
  if (length!) {
    return str?.length > length ? (str?.substring(0, length - 1) + (appendSuffix ? suffix : "")) : str
  }
  return str;
}