import { Comment } from "@/components/comment"
import { Loader } from "@/components/loader"
import iconClose from "@/images/icon-close.svg"
import iconComment from "@/images/icon-comment.svg"
import { fetchWithToken } from "@/utils"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { AddCommentSection } from "../add-comment"
import Styles from "./index.module.css"
export interface CommentsListSectionProps {
    post?: any
}

export function CommentsListSection(props: CommentsListSectionProps) {

    const [commentsVisible, setCommentsVisible] = useState<boolean>(false)

    const { data, refetch, isLoading, isFetching } = useQuery(["comments" + props?.post?.id], async () => {
        return fetchWithToken("posts/" + props?.post?.id + "/comments")
    }, {
        refetchOnWindowFocus: false,
        enabled: false
    })

    const toggleComments = () => {
        setCommentsVisible(!commentsVisible)
        if (!commentsVisible) {
            refetch()
        }
    }

    return (
        <section >
            <div className="d-flex w-100 justify-content-end">
                {commentsVisible ? <button onClick={toggleComments} className="btn btn-white d-flex align-items-center">
                    <img src={iconClose} />
                    <span className="ps-2">Close</span>
                </button> : <button onClick={toggleComments} className="btn btn-white d-flex align-items-center">
                    <img src={iconComment} />
                    <span className="ps-2">Comments</span>
                </button>}
            </div>
            {commentsVisible &&
                <>
                    <div className=" ps-2 ">
                        <AddCommentSection onSave={refetch} post={props?.post} />
                        <div className="w-75 pt-4 d-flex">
                            <h6>Recent Comments</h6>
                            {(isLoading || isFetching) &&
                                <div className="ps-2">
                                    <Loader />
                                </div>}
                        </div>
                    </div>


                    <div className="py-2">
                        {(!isLoading && !isFetching) &&
                            <div>
                                {data && data.length ?
                                    <div>
                                        {data?.map((comment: any, index: number) =>
                                            <div className={`${Styles.listItem} mb-4 shadow-xl`} key={index}>
                                                <Comment onDelete={refetch} comment={comment} />
                                            </div>
                                        )
                                        }
                                    </div>
                                    :
                                    <div className="alert alert-secondary">
                                        Seems like no one has commented yet, be the first one!
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </>
            }
        </section >
    )
}