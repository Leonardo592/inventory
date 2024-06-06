export function Buscador({ setBuscador }) {

    const buscar = (event) => {
        setBuscador(event.target.value)
    }

    return (
        <div className="relative">
            <input
                type="text"
                onChange={buscar}
                placeholder="Buscar"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );

}