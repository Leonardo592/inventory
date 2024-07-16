import { useQuery } from "@tanstack/react-query";
import { useMarcaStore } from "../store/MarcaStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnersLoading } from "../components/SpinnersLoading";
import { RegistrarMarca } from "../components/RegistrarMarca";
import { useState } from "react";
import { Buscador } from "../components/Buscador";
import { useUsuariosStore } from "../store/UsuariosStore";
import { BloqueoPagina } from "../components/BloquePagina";
import { ReporteKardex } from "../components/report/ReporteKardex";
import { PDFViewer } from "@react-pdf/renderer";
import { useKardexStore } from "../store/KardexStore";

export function ReportesPage() {

    const { dataPermisos } = useUsuariosStore()

    const statePermisos = dataPermisos.some((objeto) => objeto.modulos.nombre.includes('Marca de productos'))

    const [dataSelect, setDataSelect] = useState([])
    const [accion, setAccion] = useState('')
    const [openRegistro, setOpenRegistro] = useState(false)

    const { mostrarKardex, dataKardex } = useKardexStore()
    const { dataempresa } = useEmpresaStore()


    const { isLoading, error } = useQuery({
        queryKey: ['MostrarKardex', { _id_empresa: dataempresa.empresa.id }],
        queryFn: () => mostrarKardex({ _id_empresa: dataempresa.empresa.id }),
        enabled: dataempresa.empresa.id != null
    })

    if (statePermisos === false) {
        return <BloqueoPagina></BloqueoPagina>
    }

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
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Reportes</h2>
            {/* <section className="mb-4">
                <button
                    onClick={nuevoRegistro}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Agregar Marca
                </button>
            </section>
            <section className="mb-4">
                <Buscador setBuscador={setBuscador} />
            </section> */}
            <section className="bg-white p-4 rounded-lg shadow-md">
                <PDFViewer style={{ width: '100%', height: '100%' }}>
                    <ReporteKardex data={dataKardex}></ReporteKardex>
                </PDFViewer>
            </section>
        </div>
    );

}