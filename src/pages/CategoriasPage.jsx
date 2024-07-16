import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnersLoading } from "../components/SpinnersLoading";
import { useState } from "react";
import { Buscador } from "../components/Buscador";
import { useCategoriasStore } from "../store/CategoriasStore";
import { RegistrarCategorias } from "../components/RegistrarCategorias";
import { TablaCategorias } from "../components/tables/TablaCategorias";
import { useUsuariosStore } from "../store/UsuariosStore";
import { BloqueoPagina } from "../components/BloquePagina";

export function CategoriasPage() {

    const { dataPermisos } = useUsuariosStore()

    const statePermisos = dataPermisos.some((objeto) => objeto.modulos.nombre.includes('Categoria de productos'))

    const [dataSelect, setDataSelect] = useState([])
    const [accion, setAccion] = useState('')
    const [openRegistro, setOpenRegistro] = useState(false)

    const { mostrarCategorias, dataCategorias, buscarCategorias, buscador } = useCategoriasStore()
    const { dataempresa } = useEmpresaStore()
    const { isLoading, error } = useQuery({
        queryKey: ['MostrarCategorias', { id_empresa: dataempresa.empresa.id }],
        queryFn: () => mostrarCategorias({ id_empresa: dataempresa.empresa.id }),
        enabled: dataempresa.empresa.id != null
    })

    const { data: buscarData } = useQuery({
        queryKey: ['BuscarCategorias', { id_empresa: dataempresa.empresa.id, descripcion: buscador }],
        queryFn: () => buscarCategorias({ id_empresa: dataempresa.empresa.id, descripcion: buscador }),
        enabled: dataempresa.empresa.id != null
    })

    const nuevoRegistro = () => {
        setOpenRegistro(!openRegistro)
        setAccion('Nuevo')
        setDataSelect([])
    }

    console.log(dataSelect)
    const { setBuscador } = useCategoriasStore()

    if (statePermisos === false) {
        return <BloqueoPagina></BloqueoPagina>
    }

    if (isLoading) {
        return <SpinnersLoading></SpinnersLoading>
    }

    return (

        <div className="p-6 bg-gray-100 min-h-screen">
            {openRegistro && (
                <RegistrarCategorias
                    dataSelect={dataSelect}
                    accion={accion}
                    onClose={() => setOpenRegistro(!openRegistro)}
                />
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Categorias</h2>
            <section className="mb-4">
                <button
                    onClick={nuevoRegistro}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Agregar Categoria
                </button>
            </section>
            <section className="mb-4">
                <Buscador setBuscador={setBuscador} />
            </section>
            <section className="bg-white p-4 rounded-lg shadow-md">
                <TablaCategorias
                    data={dataCategorias}
                    setOpenRegistro={setOpenRegistro}
                    setDataSelect={setDataSelect}
                    setAccion={setAccion}
                />
            </section>
        </div>
    );

}