import React, { SelectHTMLAttributes } from "react"
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {

}

export function Select(props: SelectProps) {
    return (
        <select
            {...props}
            className={`${props.className} p-3 w-100 border border-1 rounded-2`}
            style={{
                ...(props?.style ?? {}),
                height:"64px"
            }}
        >
            {props?.children}
        </select>
    )
}
