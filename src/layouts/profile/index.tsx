import { Icon } from "@/components/icon"
import PageLink from "@/components/link"
import bgImg from "@/images/hero-bg.png"
import backIcon from "@/images/icon-chevron-left.svg"
export interface ProfileLayoutProps {
    children?: React.ReactNode
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <div
            className="container-fluid min-vh-100"
            style={{
                backgroundImage: `url(${bgImg})`,
                backgroundPosition:"center",
                backgroundSize: "cover",
                backgroundAttachment:"fixed"
            }}
        >
            <div className="col col-md-6 px-2 px-md-0 mx-auto py-5">
                <PageLink to="/">
                    <div className="d-flex">
                        <Icon src={backIcon} />
                        <span className="fw-bold ps-2">Back</span>
                    </div>
                </PageLink>
                {children}
            </div>
        </div>
    )
}