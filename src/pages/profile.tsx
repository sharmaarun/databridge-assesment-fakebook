import { CardSuspense } from "@/components/card";
import { Loader } from "@/components/loader";
import { ProfileLayout } from "@/layouts/profile";
import { CreatePostSection } from "@/sections/create-post";
import { PostsListSection } from "@/sections/posts-list";
import { ProfileCoverSection } from "@/sections/profile-cover";
import { fetchWithToken } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
export interface ProfilePageProps {

}

export function ProfilePage(props: ProfilePageProps) {
    const { id } = useParams()
    const { data: user, isLoading, isFetching, refetch } = useQuery(["single-user"], async () => {
        if (id && id.length) {
            return await fetchWithToken("users/" + id)
        }
    }, {
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (id && id.length) {
            refetch()
        }
    }, [id])


    return (
        <ProfileLayout>
            
            {(isLoading || isFetching) && <CardSuspense />}
            {(isLoading || isFetching) && <div className="py-4 w-100 d-flex justify-content-center">
                <Loader />
            </div>
            }
            {!isLoading && !isFetching && <>
                {user && user?.id ? <>
                    <ProfileCoverSection user={user} />
                    <PostsListSection user={user}/>
                </> : <div className="alert alert-warning">
                    No such user exists!
                </div>
                }
            </>
            }
        </ProfileLayout>
    )
}

export default ProfilePage;