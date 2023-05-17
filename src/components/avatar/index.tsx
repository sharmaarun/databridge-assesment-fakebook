import React from "react"
import Styles from "./index.module.css"
export interface AvatarProps {
    src?: string
    name?: string
}

export function Avatar({ src, name }: AvatarProps) {
    return (
        <div className={`${Styles.avatar} rounded-circle d-flex justify-content-center align-items-center border border-1`}>
            {src ?
                <img src={src} />
                :
                <div>{name?.length && name?.substring?.(0, 1)?.toUpperCase?.()}</div>
            }
        </div>
    )
}

export default Avatar