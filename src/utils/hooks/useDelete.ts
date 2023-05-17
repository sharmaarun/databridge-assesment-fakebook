import { useMutation } from "@tanstack/react-query"
import { fetchWithToken } from "../network"

export const useDelete = (entity: string, onSucces: ((data: any) => void)) => {
    const { mutateAsync } = useMutation(["remove" + entity], async (id: string) => {
        return await fetchWithToken(entity + "/" + id, {
            method: "DELETE"
        })
    },
        {
            onSuccess(data) {
                onSucces?.(data)
            },
        }
    )

    const handleDelete = (id: string) => (e: any) => {
        e.preventDefault(); e.stopPropagation()
        const confirm = window.confirm("You are about to delete an entry! Press OK to confirm.")
        if (confirm) mutateAsync(id)
    }

    return { handleDelete }
}