import React from "react"
export interface LoadingPageProps {

}

export function LoadingPage(props: LoadingPageProps) {
    return (
        <div className="d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 start-0 end-0">
            <h1>Loading...</h1>
        </div>
    )
}

export default LoadingPage