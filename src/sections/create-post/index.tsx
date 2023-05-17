import { ActionButton } from "@/components/action-button"
import { Card } from "@/components/card"
import { Loader } from "@/components/loader"
import { fetchWithToken } from "@/utils"
import { useMutation } from "@tanstack/react-query"
import React, { useState } from "react"
export interface CreatePostSectionProps {
    user?: any
    onSave?: (post: any) => void
}

export function CreatePostSection({ user, onSave }: CreatePostSectionProps) {

    const [post, setPost] = useState("")
    const [errors, setErrors] = useState<any[]>([])
    const [error, setError] = useState<string>("")
    const { mutateAsync, isLoading } = useMutation(["new-post"], async (post: any) => {
        setError("")
        setErrors([])
        return await fetchWithToken(`users/${user?.id}/posts`, {
            method: "POST",
            body: post
        })
    }, {
        onSuccess(data: any) {
            if (Array.isArray(data) && data?.[0]?.field) {
                setError("Please provide some content")
            } else {
                setPost("")
                onSave?.(data)
            }
        },
        onError(error: any) {
            setError(error?.message ?? error)
        },
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (post && post.length) {
            await mutateAsync({ title: "New Post", body: post })
        }
        else {
            setError("You need to write at least some content!")
        }
    }

    return (
        <Card>
            <div>
                <h5>Create New Post...</h5>
            </div>
            {error && error?.length && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        value={post}
                        onChange={e => setPost(e.target.value)}
                        className="w-100 rounded-2 border border-1 p-4"
                        placeholder="Share your thoughts with the world..."
                    />
                </div>
                <div className="d-flex align-items-center">
                    <div className="w-50 text-secondary">
                        <span>Max: 500 chars</span>
                    </div>
                    <div className="w-50 d-flex justify-content-end">
                        <ActionButton disabled={isLoading} type="submit" >
                            {isLoading ? <Loader /> : "SHARE NOW"}
                        </ActionButton>
                    </div>
                </div>
            </form>
        </Card>
    )
}