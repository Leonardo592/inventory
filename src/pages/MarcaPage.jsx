import { useQuery } from "@tanstack/react-query";
import { useMarcaStore } from "../store/MarcaStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnersLoading } from "../components/SpinnersLoading";
import { TablaMarca } from "../components/tables/TablaMarca";
import { RegistrarMarca } from "../components/RegistrarMarca";
import { useState } from "react";
import { Buscador } from "../components/Buscador";

export function MarcaPage() {

    const [dataSelect, setDataSelect] = useState([])
    const [accion, setAccion] = useState('')
    const [openRegistro, setOpenRegistro] = useState(false)

    const { mostrarMarca, dataMarca, buscarMarca, buscador } = useMarcaStore()
    const { dataempresa } = useEmpresaStore()
    const { isLoading, error } = useQuery({
        queryKey: ['MostrarMarca', { id_empresa: dataempresa.empresa.id }],
        queryFn: () => mostrarMarca({ id_empresa: dataempresa.empresa.id }),
        enabled: dataempresa.empresa.id != null
    })

    const { data: buscarData } = useQuery({
        queryKey: ['BuscarMarca', { id_empresa: dataempresa.empresa.id, descripcion: buscador }],
        queryFn: () => buscarMarca({ id_empresa: dataempresa.empresa.id, descripcion: buscador }),
        enabled: dataempresa.empresa.id != null
    })

    const nuevoRegistro = () => {
        setOpenRegistro(!openRegistro)
        setAccion('Nuevo')
        setDataSelect([])
    }

    console.log(dataSelect)
    const { setBuscador } = useMarcaStore()


    if (isLoading) {
        return <SpinnersLoading></SpinnersLoading>
    }

    return (
        
        <div className="p-6 bg-gray-100 min-h-screen">
            {openRegistro && (
                <RegistrarMarca
                    dataSelect={dataSelect}
                    accion={accion}
                    onClose={() => setOpenRegistro(!openRegistro)}
                />
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Marcas</h2>
            <section className="mb-4">
                <button
                    onClick={nuevoRegistro}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Agregar Marca
                </button>
            </section>
            <section className="mb-4">
                <Buscador setBuscador={setBuscador} />
            </section>
            <section className="bg-white p-4 rounded-lg shadow-md">
                <TablaMarca
                    data={dataMarca}
                    setOpenRegistro={setOpenRegistro}
                    setDataSelect={setDataSelect}
                    setAccion={setAccion}
                />
            </section>
        </div>
    );

}