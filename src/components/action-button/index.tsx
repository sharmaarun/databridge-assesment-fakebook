import React, { ButtonHTMLAttributes } from "react"
export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

export function ActionButton({ children, ...props }: ActionButtonProps) {
    return (
        <button {...props} style={{minHeight:"48px",...props}} className={`${props.className} fw-bold btn px-4 btn-dark`}>
            {children}
        </button>
    )
}