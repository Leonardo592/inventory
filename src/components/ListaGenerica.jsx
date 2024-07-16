export function ListaGenerica({ data, setState, funcion }) {

    const seleccionar = (p) => {
        funcion(p)
        setState()
    }

    return (
        <div className="p-2 text-sm max-h-48 overflow-y-auto">
            <div className="text-right mb-2">
                <button
                    onClick={setState}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors text-sm"
                >
                    Cerrar
                </button>
            </div>
            <div className="mt-2">
                {data.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => seleccionar(item)}
                        className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
                    >
                        <span className="text-gray-700">{item.descripcion}</span>
                    </div>
                ))}
            </div>
        </div>
    );

}