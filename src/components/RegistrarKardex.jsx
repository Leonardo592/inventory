import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useKardexStore } from "../store/KardexStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { useUsuariosStore } from "../store/UsuariosStore";
import { convertirCapitalize } from "../utils/convesiones";
import { Buscador } from "./Buscador";
import { ListaGenerica } from './ListaGenerica'
import { useProductosStore } from "../store/ProductosStore";
import { CardProductSelect } from "./CardProductSelect";

export function RegistrarKardex({ onClose, dataSelect, accion, tipo }) {

  const [stateListaProd, setStateListaProd] = useState(false)

  const { idUsuario } = useUsuariosStore()
  const { insertarKardex } = useKardexStore()
  const { dataProductos, setBuscador, selectProductos, productosItemSelect } = useProductosStore()
  const { dataempresa } = useEmpresaStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  console.log(dataSelect)
  async function insertar(data) {

    const p = {
      fecha: new Date(),
      tipo: tipo,
      id_usuario: idUsuario,
      cantidad: parseFloat(data.cantidad),
      detalle: data.detalle,
      id_empresa: dataempresa.empresa.id,
      id_producto: productosItemSelect.id
    };
    await insertarKardex(p);
    onClose();

  }
  useEffect(() => {
    if (accion === "Editar") {
    }
  }, []);
  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Nueva {tipo === "entrada" ? "Entrada" : "Salida"}</h1>
          <button onClick={onClose} className="text-red-500 text-xl">x</button>
        </div>

        <div>
          <div onClick={() => setStateListaProd(!stateListaProd)}>
            <Buscador setBuscador={setBuscador}></Buscador>
          </div>
          {
            stateListaProd && (
              <ListaGenerica data={dataProductos} setState={() => setStateListaProd(!stateListaProd)} funcion={selectProductos}></ListaGenerica>
            )
          }
        </div>

        <CardProductSelect text1={productosItemSelect.descripcion} text2={productosItemSelect.stock}></CardProductSelect>

        <form onSubmit={handleSubmit(insertar)} className="space-y-4">

          <div>
            <label className=" text-gray-700">Cantidad</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={dataSelect?.descripcion}
              type="number"
              {...register("cantidad", { required: true })}
            />
            {errors.cantidad && <p className="text-red-500">Campo requerido</p>}
          </div>

          <div>
            <label className=" text-gray-700">Motivo</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={dataSelect?.descripcion}
              type="text"
              {...register("detalle", { required: true })}
            />

            {errors.detalle && <p className="text-red-500">Campo requerido</p>}
          </div>




          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}