export function BloqueoPagina({ state }) {

    return (
        <div className={`${state ? 'hidden' : 'block'} bg-red-100 text-red-700 p-4 rounded-md`}>
            <span>💀</span>
            <span>No tienes permisos a este modulo</span>
        </div>
    );

}