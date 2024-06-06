import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useUsuariosStore } from "../store/UsuariosStore";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import { SpinnersLoading } from "../components/SpinnersLoading";
import { ProtectedRoute } from "../hooks/ProtectedRoute";
import { useEmpresaStore } from "../store/EmpresaStore";
import { ConfiguracionPage } from "../pages/ConfiguracionPage";
import { MarcaPage } from "../pages/MarcaPage";
import { Sidebar } from "../components/Sidebar";

export function MyRoutes() {

    const { user } = useAuth()
    const { mostrarUsuarios, idUsuario } = useUsuariosStore()
    const { mostrarEmpresa } = useEmpresaStore()

    const { data: dataUsuarios, isLoading, error } = useQuery({
        queryKey: ['mostrarUsuarios'],
        queryFn: mostrarUsuarios
    })

    const { data: dataEmpresa } = useQuery({
        queryKey: ['mostrarEmpresa'],
        queryFn: () => mostrarEmpresa({ idUsuario }),
        enabled: !!dataUsuarios
    })

    console.log(idUsuario)
    console.log(dataEmpresa)

    if (isLoading) {
        return <SpinnersLoading></SpinnersLoading>
    }

    if (error) {
        return <h1>Error</h1>
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar className="w-64 bg-blue-500 text-white p-4" />

            {/* Enrutador */}
            <div className="flex-grow">
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    {/* <Route path='/register' element={<RegisterPage />} /> */}
                    <Route element={<ProtectedRoute user={user} redirecTo='/login' />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/configurar' element={<ConfiguracionPage />} />
                        <Route path='/configurar/marca' element={<MarcaPage />} />
                    </Route>
                </Routes>
            </div>
        </div>

    );

}