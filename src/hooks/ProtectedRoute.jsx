import { Navigate, Outlet } from "react-router-dom"

export function ProtectedRoute({ user, children }) {

    if (user === null) return <Navigate replace to={'/login'} ></Navigate>

    //PARA RENDERIZAR LOS DEMAS COMPONENTES

    return (
        children ? children : <Outlet></Outlet>
    )
}