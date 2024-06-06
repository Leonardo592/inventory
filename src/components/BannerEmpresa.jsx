import { useEmpresaStore } from "../store/EmpresaStore";
import { CardDatosEmpresa } from "./CardDatosEmpresa";

export function BannerEmpresa() {

    const { dataempresa, contadorusuarios } = useEmpresaStore()

    return (
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <img src="" alt="logo empresa" className="h-12 w-12 mr-4" />
                <span className="text-2xl font-bold">
                    {dataempresa.empresa?.nombre}
                </span>
            </div>
            <div className="mb-4">
                <p className="text-lg">Controla tus productos con este inventario</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardDatosEmpresa titulo="Moneda" valor={dataempresa.empresa?.simbolomoneda} />
                <CardDatosEmpresa titulo="Usuarios" valor={contadorusuarios} />
            </div>
        </div>
    );

}