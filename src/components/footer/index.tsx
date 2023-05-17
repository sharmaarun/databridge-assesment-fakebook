import { clearAuth, setAuthToken } from "@/utils"
import React from "react"
export interface FooterProps {

}

export function Footer(props: FooterProps) {
    const unsetAuthToken = () => {
        const confirm = window.confirm("You are about to reset the auth token. You'll be asked to re-enter it. Press OK to confirm.")
        if (confirm) {
            clearAuth()
            window.location.reload()
        }
    }
    return (
        <div>
            <a onClick={unsetAuthToken} href="#">Click Here To Rest API TOKEN</a>
        </div>
    )
}

export default Footer