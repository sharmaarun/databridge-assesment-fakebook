import { getAuthToken } from "@/utils/auth"

export const API_URL = "https://gorest.co.in/public/v2/"

/**
 * Returns the default headers
 */
export const fetchWithToken = async (url: string, opts?: RequestInit) => {
    const token = getAuthToken()

    return await customFetch(url, {
        ...(opts ?? {}),
        headers: {
            ...(opts?.headers ?? {}),
            Authorization: "Bearer " + token
        }
    })
}

/**
 * Converts the resource uri to complete url
 * @param url 
 * @returns 
 */
export const fromURIToAPIURL = (url: string) => {
    if (url?.startsWith("/")) url = url.substring(1)
    if (url?.includes("://")) return url;
    const url_ = `${API_URL}` + url
    return url_
}

/**
 * A wrapper around fetch method
 * @param url 
 * @param opts 
 * @returns 
 */
export const customFetch = async (url: string, opts?: RequestInit) => {
    const url_ = fromURIToAPIURL(url);
    if (typeof fetch === "undefined") return;
    const result = await fetch(url_, {
        ...(opts || {}),
        headers: {
            "content-type": "application/json",
            ...(opts?.headers || {}),
        },
        ...(opts?.body ? { body: JSON.stringify(opts?.body || {}) } : {}),
    })
    let resp: any;
    try {
        resp = await result?.json?.()
    } catch (e) {
        console.error(e)
    }
    return resp
}