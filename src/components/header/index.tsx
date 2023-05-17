import React from 'react'
import headerBgGloss from "@/images/header-bg-gloss.png"
import Styles from "./index.module.css"

type Props = {}

export function Header({ }: Props) {
    return (
        <header className='container-fluid'>
            <div className={`text-white position-relative row rounded-3 p-4 shadow-lg bg-image ${Styles.headerBg}`}>
                <div className='text-center'>
                    <h6>Welcome To</h6>
                    <h3>FakeBook</h3>
                </div>
            </div>
        </header>
    )
}/* Rectangle 1 */

