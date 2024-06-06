export function AccionesTabla({ funcionEditar, funcionEliminar }) {

  return (
    <div className="flex">
      <div className="mr-2">
        <button onClick={funcionEditar} className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition-colors">
          Editar
        </button>
      </div>
      <div>
        <button onClick={funcionEliminar} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition-colors">
          Eliminar
        </button>
      </div>
    </div>

  );

}