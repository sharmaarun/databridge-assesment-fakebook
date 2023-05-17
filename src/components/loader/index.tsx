import React from "react"
export interface LoaderProps {

}

export function Loader(props: LoaderProps) {
    return (
        <div className="spinner-border spinner-border-sm"  role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}