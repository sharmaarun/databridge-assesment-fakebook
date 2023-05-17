import React from "react"
export interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {

}

export function Icon(props: IconProps) {
    return (
        <img {...props} style={{ width: "12px" }} />
    )
}
