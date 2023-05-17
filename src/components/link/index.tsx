import React from "react"
import { Link, LinkProps } from "react-router-dom"
export interface PageLinkProps extends LinkProps {

}

export function PageLink(props: PageLinkProps) {
    return (
        <Link {...props} style={{ color:"black", textDecoration: "none"}} />
    )
}

export default PageLink