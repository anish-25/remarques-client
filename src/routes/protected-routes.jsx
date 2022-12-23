import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoutes = () => {
    const { auth } = useAuth()
    let id = sessionStorage.getItem('id')
    return (
        auth?.name || id ? <Outlet /> : <Navigate to={'/login'} />
    )
}