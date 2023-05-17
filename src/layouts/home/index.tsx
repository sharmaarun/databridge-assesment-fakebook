import React from "react"
import bgImg from "@/images/hero-bg.png"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
export interface HomeLayoutProps {
    children?: React.ReactNode
}

export function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div
            className="container-fluid min-vh-100 bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${bgImg})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundAttachment:"fixed"
            }}
        >
            <div className="col col-md-6 px-2 px-md-0 mx-auto py-5">
                <Header />
                {children}
                <Footer/>
            </div>
        </div>
    )
}

