import { useQuery } from "@tanstack/react-query";
import { useMarcaStore } from "../store/MarcaStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnersLoading } from "../components/SpinnersLoading";
import { TablaMarca } from "../components/tables/TablaMarca";
import { useState } from "react";
import { Buscador } from "../components/Buscador";
import { RegistrarUsuarios } from "../components/RegistrarUsuarios";
import { useUsuariosStore } from "../store/UsuariosStore";
import { TablaUsuarios } from "../components/tables/TablaUsuarios";
import { BloqueoPagina } from "../components/BloquePagina";

export function UsuariosPage() {

    const [dataSelect, setDataSelect] = useState([])
    const [accion, setAccion] = useState('')
    const [openRegistro, setOpenRegistro] = useState(false)

    const { mostrarModulos, mostrarUsuariosTodos, dataUsuarios, buscarUsuarios, buscador, dataPermisos } = useUsuariosStore()

    const statePermisos = dataPermisos.some((objeto) => objeto.modulos.nombre.includes('Personal'))

    const { dataempresa } = useEmpresaStore()
    const { isLoading, error } = useQuery({
        queryKey: ['MostrarUsuarios', { _id_empresa: dataempresa.empresa.id }],
        queryFn: () => mostrarUsuariosTodos({ _id_empresa: dataempresa.empresa.id }),
        enabled: dataempresa.empresa.id != null
    })

    const { data: buscarData } = useQuery({
        queryKey: ['BuscarUsuarios', { _id_empresa: dataempresa.empresa.id, buscador: buscador }],
        queryFn: () => buscarUsuarios({ _id_empresa: dataempresa.empresa.id, buscador: buscador }),
        enabled: dataempresa.empresa.id != null
    })

    const { data: dataModulos } = useQuery({
        queryKey: ['MostrarModulos'],
        queryFn: () => mostrarModulos(),

    })

    const nuevoRegistro = () => {
        setOpenRegistro(!openRegistro)
        setAccion('Nuevo')
        setDataSelect([])
    }

    console.log(dataSelect)
    const { setBuscador } = useUsuariosStore()

    if (statePermisos === false) {
        return <BloqueoPagina></BloqueoPagina>
    }

    if (isLoading) {
        return <SpinnersLoading></SpinnersLoading>
    }

    return (

        <div className="p-6 bg-gray-100 min-h-screen">
            {openRegistro && (
                <RegistrarUsuarios
                    dataSelect={dataSelect}
                    accion={accion}
                    onClose={() => setOpenRegistro(!openRegistro)}
                />
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Personal</h2>
            <section className="mb-4">
                <button
                    onClick={nuevoRegistro}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Agregar Personal
                </button>
            </section>
            <section className="mb-4">
                <Buscador setBuscador={setBuscador} />
            </section>
            <section className="bg-white p-4 rounded-lg shadow-md">
                <TablaUsuarios
                    data={dataUsuarios}
                    setOpenRegistro={setOpenRegistro}
                    setDataSelect={setDataSelect}
                    setAccion={setAccion}
                />
            </section>
        </div>
    );

}