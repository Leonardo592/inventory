export function Paginacion({ table, pagina, maximo, irincio }) {

    return (
        <div className="flex items-center justify-center space-x-4">
            <button onClick={() => irincio()} disabled={!table.getCanPreviousPage()} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {'all'}
            </button>

            <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {'<-'}
            </button>

            <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">{pagina}</span>

            <p>de {maximo}</p>

            <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {'->'}
            </button>
        </div>
    );

}