import { ActionButton } from "@/components/action-button"
import Avatar from "@/components/avatar"
import { Card, CardSuspense } from "@/components/card"
import PageLink from "@/components/link"
import { Loader } from "@/components/loader"
import { MenuButton } from "@/components/menu-button"
import { fetchWithToken } from "@/utils"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { AddUserForm } from "../add-user"
import Styles from "./index.module.css"
import { trimStr } from "@/utils/core"
import { Icon } from "@/components/icon"
import iconTrash from "@/images/icon-trash.svg"
import { useDelete } from "@/utils/hooks/useDelete"
export interface UsersListSectionProps {

}

export function UsersListSection(props: UsersListSectionProps) {

    const [mode, setMode] = useState<string>("")

    const { data, refetch, isLoading, isFetching } = useQuery(["users"], async () => {
        return fetchWithToken("users")
    }, {
        refetchOnWindowFocus: false
    })

    const { handleDelete } = useDelete("users", refetch)

    return (
        <section className="py-5">
            <AddUserForm
                onClose={() => setMode("")} isOpen={mode === "ADD_USER"}
                onSave={refetch}
            />
            <div className="ps-2 d-flex">
                <div className="w-75 d-flex">
                    <h4>Users List</h4>
                    {(isLoading || isFetching) &&
                        <div className="ps-2">
                            <Loader />
                        </div>}
                </div>

                <div className="w-50 w-md-25 text-end">
                    <ActionButton onClick={e => setMode("ADD_USER")}>
                        ADD USER
                    </ActionButton>
                </div>
            </div>

            <div className="py-3">
                {(isLoading || isFetching) &&
                    <div className="ps-2">
                        <CardSuspense />
                    </div>}
                {(!isLoading && !isFetching) &&
                    <div>
                        {data && data.length ? <>
                            {data?.map((user: any, index: number) =>
                                <PageLink key={index} to={"/profile/" + user.id}>
                                    <div className={Styles.listItem}>
                                        <Card>
                                            <div className="d-flex">
                                                <div className="col-2 col-md-1 pb-2">
                                                    <Avatar name={user.name} />
                                                </div>
                                                <div className="col-8 col-md-9 ps-2 pb-2">
                                                    <h5 title={user.name} className="m-0">{trimStr(user.name)}</h5>
                                                    <span title={user.email} className="text-secondary">{trimStr(user.email)}</span>
                                                </div>
                                                <div className="col-2 col-md-2 d-flex align-items-center justify-content-center">
                                                    <button onClick={handleDelete(user.id)} className="btn">
                                                        <img src={iconTrash} />
                                                    </button>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </PageLink>
                            )}
                        </>
                            :
                            <div className="alert alert-secondary">
                                No Users Found!
                            </div>
                        }
                    </div>
                }
            </div>


        </section>
    )
}