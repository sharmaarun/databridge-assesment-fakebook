
import iconTrash from "@/images/icon-trash.svg"
import { useDelete } from "@/utils/hooks/useDelete"
import Avatar from "../avatar"
import { Card } from "../card"
export interface CommentProps {
    comment?: any
    onDelete?: any
}

export function Comment(props: CommentProps) {
    const { handleDelete } = useDelete("comments", props?.onDelete)
    return (
        <Card className="pb-2">
            <div className="d-flex align-items-start">
                <div className="col-2 col-md-1 pb-2">
                    <Avatar name={props?.comment?.name} />
                </div>
                <div className="col-8 col-md-9 ps-3 pb-2">
                    <h6 className="m-0">{props?.comment?.name}</h6>
                    <span style={{ fontSize: "12px" }} className="text-secondary">{props?.comment?.email}</span>

                </div>
                <div className="col-2 col-md-2 d-flex align-items-end justify-content-end">
                    <button onClick={handleDelete(props?.comment?.id)} className="btn">
                        <img src={iconTrash} />
                    </button>
                </div>

            </div>
            <div className="py-1 text-justify">
                <span >{props?.comment?.body}</span>
            </div>
        </Card>
    )
}