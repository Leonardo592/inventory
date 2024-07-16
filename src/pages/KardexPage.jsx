import { useQuery } from "@tanstack/react-query";
import { useMarcaStore } from "../store/MarcaStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnersLoading } from "../components/SpinnersLoading";
import { RegistrarKardex } from '../components/RegistrarKardex';
import { useState } from "react";
import { Buscador } from "../components/Buscador";
import { useUsuariosStore } from "../store/UsuariosStore";
import { BloqueoPagina } from "../components/BloquePagina";
import { Tabs } from "../components/Tabs";
import { useKardexStore } from "../store/KardexStore";
import { useProductosStore } from '../store/ProductosStore'

export function KardexPage() {

    const { dataPermisos } = useUsuariosStore()

    const statePermisos = dataPermisos.some((objeto) => objeto.modulos.nombre.includes('Marca de productos'))

    const [dataSelect, setDataSelect] = useState([])
    const [accion, setAccion] = useState('')
    const [openRegistro, setOpenRegistro] = useState(false)
    const [tipo, setTipo] = useState("")

    const { buscarProductos, buscador: buscadorProductos } = useProductosStore()
    const { mostrarKardex, dataKardex, buscarKardex, buscadorKardex, setBuscadorKardex } = useKardexStore()
    const { dataempresa } = useEmpresaStore()

    const { data: buscarData } = useQuery({
        queryKey: ['BuscarProductos', { _id_empresa: dataempresa.empresa.id, descripcion: buscadorProductos }],
        queryFn: () => buscarProductos({ _id_empresa: dataempresa.empresa.id, buscador: buscadorProductos }),
        enabled: dataempresa.empresa.id != null
    })

    const { isLoading, error } = useQuery({
        queryKey: ['MostrarKardex', { _id_empresa: dataempresa.empresa.id }],
        queryFn: () => mostrarKardex({ _id_empresa: dataempresa.empresa.id }),
        enabled: dataempresa.empresa.id != null
    })

    const { data: buscarKardexLista } = useQuery({
        queryKey: ['BuscarKardex', { _id_empresa: dataempresa.empresa.id, buscador: buscadorKardex }],
        queryFn: () => buscarKardex({ _id_empresa: dataempresa.empresa.id, buscador: buscadorKardex }),
        enabled: dataempresa.empresa.id != null
    })

    console.log(dataKardex)

    const nuevaEntrada = () => {
        setOpenRegistro(true)
        setTipo("entrada")
    }

    const nuevaSalida = () => {
        setOpenRegistro(true)
        setTipo("salida")
    }


    if (statePermisos === false) {
        return <BloqueoPagina></BloqueoPagina>
    }

    if (isLoading) {
        return <SpinnersLoading></SpinnersLoading>
    }


    return (

        <div className="p-6 bg-gray-100 min-h-screen">
            {openRegistro && (
                <RegistrarKardex
                    tipo={tipo}
                    dataSelect={dataSelect}
                    accion={accion}
                    onClose={() => setOpenRegistro(!openRegistro)}
                />
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Kardex</h2>
            <section className="mb-4">
                <button
                    onClick={nuevaEntrada}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                >
                    Entrada
                </button>

                <button
                    onClick={nuevaSalida}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                >
                    Salida
                </button>

            </section>
            <section className="mb-4">
                <Buscador setBuscador={setBuscadorKardex} />
            </section>
            <section className="bg-white p-4 rounded-lg shadow-md">
                <Tabs data={dataKardex}></Tabs>
            </section>
        </div>
    );

}