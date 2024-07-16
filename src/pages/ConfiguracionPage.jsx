import { Link } from "react-router-dom";
import { DataModulosConfiguracion } from "../utils/dataEstatica";
import { Mensaje } from "../components/Mensaje";

export function ConfiguracionPage() {

    return (
        <div className="flex min-h-screen bg-gray-100">

            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Configuración</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DataModulosConfiguracion.map((item, index) => (
                        <Link to={item.state ? item.link : ''} key={index} className="card-content bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <Mensaje state={item.state}></Mensaje>
                            <div className="p-4">
                                <div className="card-image mb-4">
                                    <img src={item.icono || ''} alt="icono de opción" className="w-full h-32 object-cover" />
                                </div>
                                <div className="card-info-wrapper">
                                    <div className="card-info">
                                        <i className="fa-duotone fa-unicorn text-2xl text-blue-500 mb-2"></i>
                                        <div className="card-info-title">
                                            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                            <h4 className="text-md text-gray-600">{item.subtitle}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

}