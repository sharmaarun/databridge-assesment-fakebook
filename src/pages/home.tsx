import { Header } from "@/components/header"
import { HomeLayout } from "@/layouts/home"
import { UsersListSection } from "@/sections/user-list"
import React from "react"
export interface HomePageProps {

}

export function HomePage(props: HomePageProps) {
    return (
        <HomeLayout>
          <UsersListSection/>
        </HomeLayout>
    )
}

export default HomePage