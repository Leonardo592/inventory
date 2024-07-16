import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useUsuariosStore } from "../store/UsuariosStore";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { SpinnersLoading } from "../components/SpinnersLoading";
import { ProtectedRoute } from "../hooks/ProtectedRoute";
import { useEmpresaStore } from "../store/EmpresaStore";
import { ConfiguracionPage } from "../pages/ConfiguracionPage";
import { MarcaPage } from "../pages/MarcaPage";
import { Sidebar } from "../components/Sidebar";
import { CategoriasPage } from "../pages/CategoriasPage";
import { ProductosPage } from "../pages/ProductosPage.jsx";
import { UsuariosPage } from "../pages/UsuariosPage.jsx";
import { KardexPage } from "../pages/KardexPage.jsx";
import { ReportesPage } from "../pages/ReportesPage.jsx";


export function MyRoutes() {

    const { user } = useAuth()
    const { mostrarUsuarios, idUsuario, mostrarPermisos } = useUsuariosStore()
    const { mostrarEmpresa } = useEmpresaStore()

    const { data: dataUsuarios, isLoading, error } = useQuery({
        queryKey: ['mostrarUsuarios'],
        queryFn: mostrarUsuarios
    })

    const { data: dataEmpresa } = useQuery({
        queryKey: ['mostrarEmpresa'],
        queryFn: () => mostrarEmpresa({ idUsuario }), // TAMBIEN PUEDE PASAR COMO OBJETO idusuario: idUsuario
        enabled: !!dataUsuarios
    })

    const { data: dataPermisos } = useQuery({
        queryKey: ['mostrarPermisos', idUsuario], // Include idUsuario in queryKey to refetch when it changes
        queryFn: () => mostrarPermisos({ id_usuario: idUsuario }), // Correct function reference
        enabled: !!dataUsuarios
    });



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
                        <Route path='/configurar/categorias' element={<CategoriasPage></CategoriasPage>} />
                        <Route path='/configurar/productos' element={<ProductosPage></ProductosPage>} />
                        <Route path='/configurar/personal' element={<UsuariosPage></UsuariosPage>} />
                        <Route path='/kardex' element={<KardexPage></KardexPage>} />
                        <Route path='/reportes' element={<ReportesPage></ReportesPage>} />
                    </Route>
                </Routes>

            </div>
        </div>

    );

}