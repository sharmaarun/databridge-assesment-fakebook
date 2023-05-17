import { Card } from "@/components/card"
import { getAuthToken, setAuthToken } from "@/utils"
import React, { useEffect, useState } from "react"
import { FormEvent } from "react"
export interface AuthLayoutProps {
    children?: any
}

export function AuthLayout({ children }: AuthLayoutProps) {
    const [token, setToken] = useState<string>()

    useEffect(() => {
        const t = getAuthToken()
        if (t && t.length) {
            setToken(t)
        }
    }, [])

    const handleTokenUpdate = (e: any) => {
        // const val = e.target.elements
        e.preventDefault()
        const _token = e.target.elements.token.value
        if (_token && _token.length) {
            setToken(_token)
            setAuthToken(_token)
        }
    }

    if (token && token.length) return <>{children}</>
    return (
        <div
            style={{ zIndex: 1 }}
            className="d-flex justify-content-center align-items-center position-fixed start-0 end-0 top-0 bottom-0 bg-dark"
        >
            <div className="w-50 mx-auto">
                <Card>
                    <h4>Enter API Key</h4>
                    <form onSubmit={handleTokenUpdate}>
                        <div className="d-flex">
                            <input name="token" className="my-2 me-2 w-100 border border-1 rounded-2 p-4" />
                            <button
                                type="submit"
                                style={{ width: "150px" }}
                                className="btn btn-primary my-2">
                                GO
                            </button>
                        </div>
                    </form>
                    <span><a target="_blank" href="https://gorest.co.in/my-account/access-tokens">Get your TOKEN from here</a></span>
                </Card>
            </div>
        </div >
    )
}
