import { useQuery } from "@tanstack/react-query";
import { useMarcaStore } from "../store/MarcaStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnersLoading } from "../components/SpinnersLoading";
import { RegistrarProductos } from "../components/RegistrarProductos";
import { useState } from "react";
import { Buscador } from "../components/Buscador";
import { useProductosStore } from "../store/ProductosStore";
import { TablaProductos } from "../components/tables/TablaProductos";
import { useCategoriasStore } from "../store/CategoriasStore";
import { useUsuariosStore } from "../store/UsuariosStore";
import { BloqueoPagina } from "../components/BloquePagina";

export function ProductosPage() {

    const { dataPermisos } = useUsuariosStore()

    const statePermisos = dataPermisos.some((objeto) => objeto.modulos.nombre.includes('Productos'))

    if (statePermisos === false) {
        return <BloqueoPagina></BloqueoPagina>
    }

    const [dataSelect, setDataSelect] = useState([])
    const [accion, setAccion] = useState('')
    const [openRegistro, setOpenRegistro] = useState(false)

    const { mostrarMarca } = useMarcaStore()
    const { mostrarCategorias } = useCategoriasStore()
    const { mostrarProductos, dataProductos, buscarProductos, buscador, setBuscador } = useProductosStore()
    const { dataempresa } = useEmpresaStore()
    const { isLoading, error } = useQuery({
        queryKey: ['MostrarProductos', { _id_empresa: dataempresa.empresa.id }],
        queryFn: () => mostrarProductos({ _id_empresa: dataempresa.empresa.id }),
        enabled: dataempresa.empresa.id != null
    })

    const { data: buscarData } = useQuery({
        queryKey: ['BuscarProductos', { _id_empresa: dataempresa.empresa.id, descripcion: buscador }],
        queryFn: () => buscarProductos({ _id_empresa: dataempresa.empresa.id, buscador: buscador }),
        enabled: dataempresa.empresa.id != null
    })

    const { data: dataMarcas } = useQuery({
        queryKey: ['MostrarMarca', { id_empresa: dataempresa.empresa.id }],
        queryFn: () => mostrarMarca({ id_empresa: dataempresa.empresa.id }),
        enabled: dataempresa.empresa.id != null
    })

    const { data: dataCategorias } = useQuery({
        queryKey: ['MostrarCategorias', { id_empresa: dataempresa.empresa.id }],
        queryFn: () => mostrarCategorias({ id_empresa: dataempresa.empresa.id }),
        enabled: dataempresa.empresa.id != null
    })


    const nuevoRegistro = () => {
        setOpenRegistro(!openRegistro)
        setAccion('Nuevo')
        setDataSelect([])
    }

    console.log(dataSelect)

    if (isLoading) {
        return <SpinnersLoading></SpinnersLoading>
    }

    return (

        <div className="p-6 bg-gray-100 min-h-screen">
            {openRegistro && (
                <RegistrarProductos
                    dataSelect={dataSelect}
                    accion={accion}
                    onClose={() => setOpenRegistro(!openRegistro)}
                />
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Productos</h2>
            <section className="mb-4">
                <button
                    onClick={nuevoRegistro}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Agregar producto
                </button>
            </section>
            <section className="mb-4">
                <Buscador setBuscador={setBuscador} />
            </section>
            <section className="bg-white p-4 rounded-lg shadow-md">
                <TablaProductos
                    data={dataProductos}
                    setOpenRegistro={setOpenRegistro}
                    setDataSelect={setDataSelect}
                    setAccion={setAccion}
                />
            </section>
        </div>
    );

}