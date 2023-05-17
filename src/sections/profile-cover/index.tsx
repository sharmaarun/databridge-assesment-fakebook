import React from "react"
import profileCover from "@/images/profile-bg.png"
import Avatar from "@/components/avatar"
import { trimStr } from "@/utils/core"
export interface ProfileCoverSectionProps {
    user?: any
}

export function ProfileCoverSection({ user }: ProfileCoverSectionProps) {
    return (
        <div
            className="my-4  overflow-hidden position-relative shadow-lg rounded-4 border border-1 p-4"
            style={{
                backgroundImage: `url(${profileCover})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                minHeight: "100px"
            }}
        >
            <div
                className="position-absolute top-0 bottom-0 start-0 end-0"
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.67) -54.19%, rgba(0, 0, 0, 0) 95.79%)`,
                    zIndex: 0
                }}
            />
            <div className="d-flex position-relative" style={{ zIndex: 1 }}>
                <div style={{ flexShrink: 0 }}>
                    <Avatar name={user?.name ?? "Un-named"} />
                </div>
                <div className="ps-4 text-white">
                    <h5 className="p-0 m-0 text-truncate">{trimStr(user?.name) ?? "Un-named"}</h5>
                    <span className="text-truncate">{trimStr(user?.email) ?? "--"}</span>
                </div>
            </div>
        </div>
    )
}