import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../store/EmpresaStore";
import { convertirCapitalize } from "../utils/convesiones";
import { useProductosStore } from "../store/ProductosStore";
import { Selector } from "./Selector";
import { useMarcaStore } from "../store/MarcaStore";
import { RegistrarMarca } from './RegistrarMarca'
import { ListaGenerica } from "./ListaGenerica";
import { useCategoriasStore } from '../store/CategoriasStore'
import { RegistrarCategorias } from "./RegistrarCategorias";

export function RegistrarProductos({ onClose, dataSelect, accion }) {
  const { insertarProductos, editarProductos } = useProductosStore();
  const { dataempresa } = useEmpresaStore();
  const { marcaItemSelect, dataMarca, selectMarca } = useMarcaStore()
  const { categoriasItemSelect, dataCategorias, selectCategorias } = useCategoriasStore()
  const [stateMarca, setStateMarca] = useState(false)
  const [stateCategoria, setStateCategoria] = useState(false)
  const [openRegistroMarca, setOpenRegistroMarca] = useState(false)
  const [openRegistroCategoria, setOpenRegistroCategoria] = useState(false)
  const [nuevaAccion, setNuevaAccion] = useState("")

  const nuevoRegistroMarca = () => {
    setOpenRegistroMarca(!openRegistroMarca)
    setNuevaAccion('Nuevo')
  }

  const nuevoRegistroCategoria = () => {
    setOpenRegistroCategoria(!openRegistroCategoria)
    setNuevaAccion('Nuevo')
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  console.log(marcaItemSelect)
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        descripcion: convertirCapitalize(data.descripcion),
        idmarca: marcaItemSelect.id,
        stock: parseFloat(data.stock),
        stock_minimo: parseFloat(data.stock_minimo),
        codigobarras: parseFloat(data.codigobarras),
        codigointerno: data.codigointerno,
        precioventa: parseFloat(data.precioventa),
        preciocompra: parseFloat(data.preciocompra),
        id_categoria: categoriasItemSelect.id,
        id_empresa: dataempresa.empresa.id,
      };
      await editarProductos(p);
      onClose();
    } else {
      const p = {
        _descripcion: convertirCapitalize(data.descripcion),
        _idmarca: marcaItemSelect.id,
        _stock: parseFloat(data.stock),
        _stock_minimo: parseFloat(data.stock_minimo),
        _codigobarras: parseFloat(data.codigobarras),
        _codigointerno: data.codigointerno,
        _precioventa: parseFloat(data.precioventa),
        _preciocompra: parseFloat(data.preciocompra),
        _id_categoria: categoriasItemSelect.id,
        _id_empresa: dataempresa.empresa.id,
      };
      await insertarProductos(p);
      onClose();
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      selectMarca({id: dataSelect.idmarca, descripcion: dataSelect.marca})
      selectCategorias({id: dataSelect.id_categoria, descripcion: dataSelect.categoria})
    }
  }, []);
  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold">{accion === "Editar" ? "Editar producto" : "Registrar nuevo producto"}</h1>
          <button onClick={onClose} className="text-red-500 text-lg">x</button>
        </div>
        <form onSubmit={handleSubmit(insertar)} className="space-y-4 text-sm">

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-grow">
              <section className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-gray-700">Producto</label>
                  <input
                    className="form__field w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    defaultValue={dataSelect?.descripcion}
                    type="text"
                    {...register("descripcion", { required: true })}
                  />
                  {errors.nombre && <p className="text-red-500 text-xs">Campo requerido</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="marca" className="block text-gray-700">Marca:</label>
                  <Selector
                    state={stateMarca}
                    funcion={() => setStateMarca(!stateMarca)}
                    texto1={'🍷'}
                    texto2={marcaItemSelect?.descripcion}
                  />
                  {stateMarca && (
                    <ListaGenerica
                      setState={() => setStateMarca(!stateMarca)}
                      data={dataMarca}
                      funcion={selectMarca}
                    />
                  )}
                  <button
                    onClick={nuevoRegistroMarca}
                    className="mt-1 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-colors text-sm"
                  >
                    Agregar
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-700">Stock</label>
                  <input
                    className="form__field w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    type="number"
                    step={'0.01'}
                    defaultValue={dataSelect?.stock}
                    {...register("stock", { required: true })}
                  />
                  {errors.stock && <p className="text-red-500 text-xs">Campo requerido</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-700">Stock Minimo</label>
                  <input
                    className="form__field w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    type="number"
                    step={'0.01'}
                    defaultValue={dataSelect?.stock_minimo}
                    {...register("stock_minimo", { required: true })}
                  />
                  {errors.stock_minimo && <p className="text-red-500 text-xs">Campo requerido</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="categoria" className="block text-gray-700">Categoría:</label>
                  <Selector
                    state={stateCategoria}
                    funcion={() => setStateCategoria(!stateCategoria)}
                    texto1={'👉'}
                    texto2={categoriasItemSelect?.descripcion}
                  />
                  {stateCategoria && (
                    <ListaGenerica
                      setState={() => setStateCategoria(!stateCategoria)}
                      data={dataCategorias}
                      funcion={selectCategorias}
                    />
                  )}
                  <button
                    onClick={nuevoRegistroCategoria}
                    className="mt-1 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-colors text-sm"
                  >
                    Agregar
                  </button>
                </div>
              </section>
            </div>

            <div className="flex-grow">
              <section className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-gray-700">Código de Barras</label>
                  <input
                    className="form__field w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    defaultValue={dataSelect?.codigobarras}
                    type="number"
                    {...register("codigobarras", { required: true })}
                  />
                  {errors.codigobarras && <p className="text-red-500 text-xs">Campo requerido</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-700">Código Interno</label>
                  <input
                    className="form__field w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    defaultValue={dataSelect?.codigointerno}
                    type="number"
                    {...register("codigointerno", { required: true })}
                  />
                  {errors.codigointerno && <p className="text-red-500 text-xs">Campo requerido</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-700">Precio de venta</label>
                  <input
                    className="form__field w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    defaultValue={dataSelect?.precioventa}
                    type="number"
                    {...register("precioventa", { required: true })}
                  />
                  {errors.precioventa && <p className="text-red-500 text-xs">Campo requerido</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-700">Precio de compra</label>
                  <input
                    className="form__field w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    defaultValue={dataSelect?.preciocompra}
                    type="number"
                    {...register("preciocompra", { required: true })}
                  />
                  {errors.preciocompra && <p className="text-red-500 text-xs">Campo requerido</p>}
                </div>

              </section>
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Guardar
            </button>
          </div>
        </form>



        {openRegistroMarca && (
          <RegistrarMarca
            accion={nuevaAccion}
            onClose={() => setOpenRegistroMarca(!openRegistroMarca)}
            dataSelect={dataSelect}
          />
        )}

        {openRegistroCategoria && (
          <RegistrarCategorias
            onClose={() => setOpenRegistroCategoria(!openRegistroCategoria)}
            accion={nuevaAccion}
            dataSelect={dataSelect}
          />
        )}
      </div>
    </div>

  );
}