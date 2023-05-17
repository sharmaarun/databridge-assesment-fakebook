import { CardSuspense } from "@/components/card"
import { Loader } from "@/components/loader"
import { PostCard } from "@/components/post-card"
import { fetchWithToken } from "@/utils"
import { useQuery } from "@tanstack/react-query"
import { CommentsListSection } from "../comments-list"
import { CreatePostSection } from "../create-post"
import Styles from "./index.module.css"

export interface PostsListSectionProps {
    user?: any
}

export function PostsListSection(props: PostsListSectionProps) {
    const { data, refetch, isLoading, isFetching } = useQuery(["userposts"], async () => {
        return fetchWithToken("users/" + props?.user?.id + "/posts")
    }, {
        refetchOnWindowFocus: false
    })

    return (
        <section className="py-2">
            <CreatePostSection onSave={refetch} user={props?.user} />
            <div className="pt-4 ps-2 d-flex">
                <div className="w-75 d-flex">
                    <h4>Recent Posts</h4>
                    {(isLoading || isFetching) &&
                        <div className="ps-2">
                            <Loader />
                        </div>}
                </div>
            </div>

            <div className="py-2">
                {(isLoading || isFetching) &&
                    <div className="ps-2">
                        <CardSuspense />
                    </div>}
                {(!isLoading && !isFetching) &&
                    <div>
                        {data && data.length ?
                            <div>
                                {data?.map((post: any, index: number) =>
                                    <div className={`${Styles.listItem} mb-4 shadow-xl`} key={index}>
                                        <PostCard onDelete={refetch} post={post} user={props?.user} >
                                            <CommentsListSection post={post} />
                                        </PostCard>
                                    </div>
                                )
                                }
                            </div> :
                            <div className="alert alert-secondary">
                                User hasn't posted anything yet!
                            </div>
                        }
                    </div>
                }
            </div>


        </section >
    )
}