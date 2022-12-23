import { Navigate, Outlet, Route } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const PublicRoutes = () => {
    const { auth } = useAuth()
    let id = sessionStorage.getItem('id')
    return (
        auth?.name || id ? <Navigate to={'/home'} /> : <Outlet />
    )
}