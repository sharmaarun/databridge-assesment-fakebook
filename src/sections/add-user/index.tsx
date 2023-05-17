import { ActionButton } from "@/components/action-button"
import { Input } from "@/components/input"
import { Loader } from "@/components/loader"
import { Modal, ModalProps } from "@/components/modal"
import { Select } from "@/components/select"
import { fetchWithToken } from "@/utils"
import { useMutation } from "@tanstack/react-query"
import React, { FormEvent, useState } from "react"
export interface AddUserFormProps extends ModalProps {
    onSave?: (saved: any) => void
}

export function AddUserForm(props: AddUserFormProps) {
    const [errors, setErrors] = useState<any[]>([])
    const [error, setError] = useState<string>("")
    const { mutateAsync, isLoading } = useMutation(["new-user"], async (user: any) => {
        return await fetchWithToken("users", {
            method: "POST",
            body: user
        })
    }, {
        onSuccess(data) {
            if (Array.isArray(data) && data?.[0]?.field) {
                setErrors(data)
            } else {
                props?.onClose?.()
                props?.onSave?.(data)
            }
        },
        onError(error: any) {
            setError(error?.message ?? error)
        }
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { name, email, gender, status } = e.target.elements || {}
        const obj = {
            name: name?.value,
            email: email?.value,
            gender: gender?.value,
            status: status?.value
        }
        await mutateAsync(obj)
    }

    const getError = (fieldName: string) => {
        if (errors && errors.length) {
            return errors.find(e => e.field === fieldName)
        }
    }

    return (<>
        <Modal {...props}>
            <h4>Add New User</h4>
            {error && error?.length && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label className="w-100 my-2">
                    <h6>Full Name</h6>
                    <Input name="name" autoFocus={true} />
                    {getError("name") && <div className="alert alert-danger">{getError("name")?.message}</div>}
                </label>
                <label className="w-100 my-2">
                    <h6>Email ID</h6>
                    <Input type="email" name="email" />
                    {getError("email") && <div className="alert alert-danger">{getError("email")?.message}</div>}
                </label>
                <label className="w-100 my-2">
                    <h6>Gender</h6>
                    <Select name="gender" >
                        <option >--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Select>
                    {getError("gender") && <div className="alert alert-danger">{getError("gender")?.message}</div>}
                </label>
                <label className="w-100 my-2">
                    <h6>Status</h6>
                    <Select name="status" >
                        <option >--</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Select>
                    {getError("status") && <div className="alert alert-danger">{getError("status")?.message}</div>}
                </label>
                <ActionButton disabled={isLoading} type="submit" className="w-100">
                    {isLoading ? <Loader /> : "SAVE"}
                </ActionButton>
            </form>
        </Modal>
    </>
    )
}