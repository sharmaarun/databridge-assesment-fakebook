import LoadingPage from "@/components/loading-page";
import { AuthLayout } from "@/layouts/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";


// pages
const HomePage = React.lazy(() => import("@/pages/home"))
const ProfilePage = React.lazy(() => import("@/pages/profile"))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<LoadingPage/>}><HomePage /></Suspense>
    },
    {
        path: '/profile/:id',
        element: <Suspense fallback={<LoadingPage/>}><ProfilePage /></Suspense>
    },

])

const qc = new QueryClient()

export interface AppRouterProps {

}

export function AppRouter(props: AppRouterProps) {
    return (
        <QueryClientProvider client={qc}>
            <AuthLayout>
                <RouterProvider router={router} />
            </AuthLayout>
        </QueryClientProvider>
    )
}
