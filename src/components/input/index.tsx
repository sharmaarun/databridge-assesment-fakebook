import React, { HTMLAttributes, InputHTMLAttributes } from "react"
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export function Input(props: InputProps) {
    return (
        <input {...props} className="border border-1 p-3 w-100 rounded-2"/>
    )
}
