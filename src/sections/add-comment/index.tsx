import { ActionButton } from "@/components/action-button"
import { Card } from "@/components/card"
import { Input } from "@/components/input"
import { Loader } from "@/components/loader"
import { fetchWithToken } from "@/utils"
import { useMutation } from "@tanstack/react-query"
import React, { useState } from "react"
export interface AddCommentSectionProps {
    post?: any
    onSave?: (comment: any) => void
}

export function AddCommentSection({ post, onSave }: AddCommentSectionProps) {
    const [comment, setComment] = useState<string>("")
    const [errors, setErrors] = useState<any[]>([])
    const [error, setError] = useState<string>("")
    const { mutateAsync, isLoading } = useMutation(["new-comment"], async (comment: any) => {
        setError("")
        setErrors([])
        return await fetchWithToken(`posts/${post?.id}/comments`, {
            method: "POST",
            body: comment
        })
    }, {
        onSuccess(data: any) {
            if (Array.isArray(data) && data?.[0]?.field) {
                setErrors(data)
            } else {
                setComment("")
                onSave?.(data)
            }
        },
        onError(error: any) {
            setError(error?.message ?? error)
        },
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (comment && comment.length) {
            const { name, email } = e.target.elements
            await mutateAsync({ name: name.value, email: email.value, title: "New Comment", body: comment })
        }
        else {
            setError("You need to write at least some content!")
        }
    }

    const getError = (fieldName: string) => {
        if (errors && errors.length) {
            return errors.find(e => e.field === fieldName)
        }
    }

    return (
        <>
            <div>
                <h5>Add Comment...</h5>
            </div>
            {error && error?.length && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="d-flex">
                        <div className="w-100">
                            <Input autoFocus={true} name="name" placeholder="Full Name (required)" />
                            {getError("name") && <div className="alert alert-danger">{getError("name")?.message}</div>}
                        </div>
                        <div className="w-100">
                            <Input name="email" placeholder="Email ID (required)" />
                            {getError("email") && <div className="alert alert-danger">{getError("email")?.message}</div>}
                        </div>
                    </div>
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        className="w-100 rounded-2 border border-1 p-4"
                        placeholder="Write your comment..."
                    />
                </div>
                <div className="d-flex pt-2 justify-content-end">
                    <ActionButton disabled={isLoading} type="submit" >
                        {isLoading ? <Loader /> : "SUBMIT"}
                    </ActionButton>
                </div>
            </form>
        </>
    )
}