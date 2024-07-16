import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../store/EmpresaStore";
import { useProductosStore } from "../store/ProductosStore";
import { Selector } from "./Selector";
import { useMarcaStore } from "../store/MarcaStore";
import { useCategoriasStore } from '../store/CategoriasStore'
import { TipoDocData, TipouserData } from '../utils/dataEstatica'
import { ListaGenerica } from "./ListaGenerica";
import { ListaModulos } from './ListaModulos'
import { useUsuariosStore } from "../store/UsuariosStore";


export function RegistrarUsuarios({ onClose, dataSelect, accion }) {

  const { isLoading } = useQuery({
    queryKey: ['mostrarPermisosEdit', { id_usuario: dataSelect.id }],
    queryFn: () => mostrarPermisosEdit({ id_usuario: dataSelect.id })
  })

  const { insertarUsuarios, mostrarPermisosEdit, editarUsuarios } = useUsuariosStore()
  const { dataempresa } = useEmpresaStore();

  const [checkboxs, setCheckboxs] = useState([])

  const { marcaItemSelect, dataMarca, selectMarca } = useMarcaStore()
  const { categoriasItemSelect, dataCategorias, selectCategorias } = useCategoriasStore()
  const [stateTipodoc, setStateTipodoc] = useState(false)
  const [stateTipouser, setStateTipouser] = useState(false)
  const [openRegistroMarca, setOpenRegistroMarca] = useState(false)
  const [openRegistroCategoria, setOpenRegistroCategoria] = useState(false)
  const [nuevaAccion, setNuevaAccion] = useState("")
  const [tipodoc, setTipodoc] = useState({
    icono: '',
    descripcion: 'otros'
  })

  const [tipouser, setTipouser] = useState({
    icono: '',
    descripcion: 'empleado'
  })

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

  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        nombres: data.nombres,
        nro_doc: data.nrodoc,
        telefono: data.telefono,
        direccion: data.direccion,
        tipouser: tipouser.descripcion,
        tipodoc: tipodoc.descripcion
      };
      await editarUsuarios(p, checkboxs, dataempresa.empresa.id);
      onClose();
    } else {
      const p = {
        nombres: data.nombres,
        correo: data.correo,
        nro_doc: data.nrodoc,
        telefono: data.telefono,
        direccion: data.direccion,
        tipouser: tipouser.descripcion,
        tipodoc: tipodoc.descripcion,
        id_empresa: dataempresa.empresa.id
      };

      const parametrosAuth = {
        correo: data.correo,
        pass: data.pass
      }

      await insertarUsuarios(parametrosAuth, p, checkboxs);
      onClose();
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      setTipodoc({icono: '', descripcion: dataSelect.tipodoc})
      setTipouser({icono: '', descripcion: dataSelect.tipouser})
    }
  }, []);

  if (isLoading) {
    return <span>cargando...</span>
  }

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold">{accion === "Editar" ? "Editar usuario" : "Registrar nuevo usuario"}</h1>
          <button onClick={onClose} className="text-red-500 text-lg">x</button>
        </div>
        <form onSubmit={handleSubmit(insertar)} className="space-y-4 text-sm">

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-grow">
              <section className="space-y-4">
                {
                  accion !== "Editar" ? (
                    <div className="space-y-1">

                      <label className="block text-gray-700">Correo</label>
                      <input
                        className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        defaultValue={dataSelect?.correo}
                        type="text"
                        {...register("correo", { required: true })}
                      />
                      {errors.correo && <p className="text-red-500 text-xs">Campo requerido</p>}
                    </div>
                  ) : (<span> {dataSelect.correo} </span>)
                }

                {
                  accion != 'Editar' ? (
                    <div className="space-y-1">
                      <label className="block text-gray-700">Contraseña</label>
                      <input
                        className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        defaultValue={dataSelect?.pass}
                        type="text"
                        {...register("pass", { required: true, minLength: 6 })}
                      />
                      {errors.pass?.type === 'required' && <p className="text-red-500 text-xs">Campo requerido</p>}
                      {errors.pass?.type === 'minLength' && <p className="text-red-500 text-xs">Debe tener al menos 6  caracteres</p>}
                    </div>
                  ) : (null)
                }



                <div className="space-y-1">
                  <label className="block text-gray-700">Nombres</label>
                  <input
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    defaultValue={dataSelect?.nombres}
                    type="text"
                    {...register("nombres", { required: true })}
                  />
                  {errors.nombres && <p className="text-red-500 text-xs">Campo requerido</p>}
                </div>

                <div>
                  <label htmlFor="">Tipo doc: </label>
                  <Selector
                    texto1={'💼'}
                    texto2={tipodoc.descripcion}
                    funcion={() => setStateTipodoc(!stateTipodoc)}
                  />

                  {
                    stateTipodoc && (
                      <ListaGenerica
                        data={TipoDocData} setState={() => setStateTipodoc(!stateTipodoc)} funcion={(p) => setTipodoc(p)}
                      >
                      </ListaGenerica>
                    )
                  }
                </div>


                <div className="space-y-1">
                  <label className="block text-gray-700">Nro doc</label>
                  <input
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    type="number"
                    defaultValue={dataSelect?.nro_doc}
                    {...register("nrodoc", { required: true })}
                  />
                  {errors.nrodoc && <p className="text-red-500 text-xs">Campo requerido</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-700">Telefono</label>
                  <input
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    type="number"
                    defaultValue={dataSelect?.telefono}
                    {...register("telefono", { required: true })}
                  />
                  {errors.telefono && <p className="text-red-500 text-xs">Campo requerido</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-700">Direccion</label>
                  <input
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    type="text"
                    defaultValue={dataSelect?.direccion}
                    {...register("direccion", { required: true })}
                  />
                  {errors.direccion && <p className="text-red-500 text-xs">Campo requerido</p>}
                </div>

              </section>
            </div>

            <div className="flex-grow">
              <section className="space-y-4">

                <div>
                  <label htmlFor="">Tipo: </label>
                  <Selector
                    texto1={'👮'}
                    texto2={tipouser.descripcion}
                    funcion={() => setStateTipouser(!stateTipouser)}
                  />
                  {
                    stateTipouser && (
                      <ListaGenerica
                        data={TipouserData}
                        funcion={(p) => setTipouser(p)}
                        setState={() => setStateTipouser(!stateTipouser)} >

                      </ListaGenerica>
                    )
                  }
                </div>

                PERMISOS: 🔑

                <ListaModulos accion={accion} checkboxs={checkboxs} setCheckboxs={setCheckboxs}></ListaModulos>


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



      </div>
    </div>

  );
}