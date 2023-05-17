
import iconTrash from "@/images/icon-trash.svg"
import { trimStr } from "@/utils/core"
import { useDelete } from "@/utils/hooks/useDelete"
import Avatar from "../avatar"
import { Card } from "../card"
export interface PostCardProps {
    user?: any
    post?: any
    children?: any
    onDelete?: any
}

export function PostCard(props: PostCardProps) {

    const { handleDelete } = useDelete("posts", props?.onDelete)
    return (
        <Card>
            <div className="d-flex align-items-start">
                <div className="col-2 col-md-1 pb-2">
                    <Avatar name={props?.user?.name} />
                </div>
                <div className="col-8 col-md-9 ps-3 pb-2">
                    <h6 className="m-0">{props?.user?.name}</h6>
                    <span title={props?.user?.email} style={{ fontSize: "12px" }} className="text-secondary">{trimStr(props?.user?.email, { length: 25 })}</span>

                </div>
                <div style={{ flexShrink: 0 }} className="col-2 col-md-2 d-flex align-items-end justify-content-end">
                    <button onClick={handleDelete(props?.post?.id)} className="btn">
                        <img src={iconTrash} />
                    </button>
                </div>

            </div>
            <div className="py-3 ">
                <span >{props?.post?.body}</span>
            </div>
            {props?.children}
        </Card>
    )
}