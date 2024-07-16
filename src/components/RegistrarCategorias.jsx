import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMarcaStore } from "../store/MarcaStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { convertirCapitalize } from "../utils/convesiones";
import { CirclePicker } from 'react-color'
import { useCategoriasStore } from "../store/CategoriasStore";

export function RegistrarCategorias({ onClose, dataSelect, accion }) {

  const [currentColor, setCurrentColor] = useState('#F44336')
  const { insertarCategorias, editarCategorias } = useCategoriasStore();
  const { dataempresa } = useEmpresaStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  const elegirColor = (color) => {
    setCurrentColor(color.hex)
  }

  console.log(dataSelect)
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        descripcion: convertirCapitalize(data.nombre),
        color: currentColor
      };
      await editarCategorias(p);
      onClose();
    } else {
      const p = {
        _descripcion: convertirCapitalize(data.nombre),
        _idempresa: dataempresa.empresa.id,
        _color: currentColor
      };
      await insertarCategorias(p);
      onClose();
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      setCurrentColor(dataSelect.color) // PARA ACTUALIZAR EL COLOR CUANDO SE EDITA CATEGORIA
    }
  }, []);
  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">{accion === "Editar" ? "Editar categoria" : "Registrar nueva categoria"}</h1>
          <button onClick={onClose} className="text-red-500 text-xl">x</button>
        </div>
        <form onSubmit={handleSubmit(insertar)} className="space-y-4">
          <div>
            <input
              className="form__field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={dataSelect?.descripcion}
              type="text"
              {...register("nombre", { required: true })}
            />
            <label className="form__label text-gray-700">Categoria</label>
            {errors.nombre && <p className="text-red-500">Campo requerido</p>}
          </div>


          <div>
            <CirclePicker onChange={elegirColor} color={currentColor}></CirclePicker>
          </div>

          {
            currentColor
          }

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