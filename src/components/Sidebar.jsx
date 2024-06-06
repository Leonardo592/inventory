import { NavLink } from 'react-router-dom';
import { LinksArray, SecondarylinksArray } from '../utils/dataEstatica'

export function Sidebar() {

    return (

        <div className="h-screen bg-blue-500 text-white p-4 flex flex-col justify-between">
            <div>
                <div className="mb-8">
                    <div className="logo mb-4">
                        <img src="" alt="logo empresa" className="h-12 w-auto mx-auto" />
                    </div>
                    <h1 className="text-2xl font-bold text-center">Empresa</h1>
                </div>
                <div className="space-y-4">
                    {LinksArray.map(({ label, to }) => (
                        <NavLink
                            key={label}
                            to={to}
                            className={`block py-2 px-4 rounded hover:bg-blue-600 transition-colors ${window.location.pathname === to ? 'active-link' : ''}`}
                        >
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <span className="block border-t border-blue-400 my-4"></span>
                <div className="space-y-4">
                    {SecondarylinksArray.map(({ label, to }) => (
                        <NavLink
                            key={label}
                            to={to}
                            className="block py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                            activeClassName="bg-blue-700"
                        >
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>

    );

}