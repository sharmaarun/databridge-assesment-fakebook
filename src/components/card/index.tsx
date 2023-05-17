import React, { HTMLAttributes, ReactPropTypes } from "react"
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function Card({ children, ...props }: CardProps) {
    return (
        <div
            {...props}
            className={`${props.className}  bg-white border border-1 rounded-4 bg-light shadow-xl p-4 `}
            style={{
                ...(props?.style ?? {}),
                overflowX: "hidden",
                overflowY: "auto"
            }}
        >
            {children}
        </div>
    )
}


export interface CardSuspenseProps {

}

export function CardSuspense(props: CardSuspenseProps) {
    return (
        <div className="  w-100 rounded-4 shadow-xl p-4" style={{ backgroundColor: "#FFF" }}>
            <div className="row w-50  my-2" style={{ height: "20px", backgroundColor: "#EEE" }}></div>
            <div className="row w-25 " style={{ height: "20px", backgroundColor: "#EEE" }}></div>
        </div>
    )
}