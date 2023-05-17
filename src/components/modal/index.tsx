import React from "react"
import { Card } from "../card"
import { Icon } from "../icon"
import closeIcon from "@/images/icon-close.svg"
export interface ModalProps {
    isOpen?: boolean
    onClose?: () => void
    children?: any
}

export function Modal({ isOpen = false, onClose, children }: ModalProps) {
    if (!isOpen) return <></>
    return (
        <div
            className="overflow-auto position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-end"
            style={{ zIndex: 10 }}
        >
            <div
                className="position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-end overflow-auto"
                style={{ zIndex: 0, backgroundColor: "rgba(0,0,0,0.3)" }}
                onClick={onClose}
            />
            <div
                className="position-relative max-vh-75 col col-12 col-md-6 mx-auto overflow-auto"
                style={{ zIndex: 1 }}
            >
                <Card className="position-relative" style={{maxHeight:"90vh"}}>
                    <div
                        className="position-absolute"
                        style={{ right: "20px", top: "10px" }}
                        onClick={onClose}
                    >
                        <Icon src={closeIcon} />
                    </div>
                    {children}
                </Card>
            </div>
        </div>
    )
}