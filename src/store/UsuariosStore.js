import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import { BuscarUsuarios, EditarUsuarios, EliminarPermisos, InsertarAsignaciones, InsertarPermisos, InsertarUsuarios, MostrarModulos, MostrarPermisos, MostrarUsuarios, MostrarUsuariosTodos } from "../supabase/crudUsuarios";
import { DataModulosConfiguracion } from "../utils/dataEstatica";


export const useUsuariosStore = create((set, get) => ({

    dataModulos: [],
    insertarUsuarioAdmin: async (p) => {
        const { data, error } = await supabase.auth.signUp({
            email: p.correo,
            password: p.pass
        });

        console.log('Del user AUTH', data)

        if (error) return

        const dataUser = await InsertarUsuarios({ idauth: data.user.id, fecharegistro: new Date(), tipouser: 'superadmin' })

        return dataUser

    },


    insertarUsuarioAdminGoogle: async (p) => {
        const { data, error } = await supabase.auth.signUp({
            email: p.correo,
        });

        console.log('Del user AUTH', data)

        if (error) return

        const dataUser = await InsertarUsuarios({ idauth: data.user.id, fecharegistro: new Date(), tipouser: 'admin' })

        return dataUser

    },

    idUsuario: 0,
    mostrarUsuarios: async () => {
        try {
            const response = await MostrarUsuarios();

            console.log(response);

            set({ idUsuario: response.id });

            return response; // Asegúrate de devolver los datos aquí
        } catch (error) {
            console.log('Error en mostrarUsuarios:', error);
            throw error; // Asegúrate de manejar el error adecuadamente
        }
    },

    buscador: "",
    setBuscador: (p) => {
        set({ buscador: p })
    },
    dataUsuarios: [],
    usuariosItemSelect: [],
    parametros: {},

    mostrarUsuariosTodos: async (p) => {
        const response = await MostrarUsuariosTodos(p);

        set({ parametros: p })
        set({ dataUsuarios: response })
        set({ usuariosItemSelect: response[0] })

        return response;
    },

    selectUsuarios: (p) => {
        set({ usuariosItemSelect: p })
    },

    insertarUsuarios: async (parametrosAuth, p, datacheckpermisos) => {
        const { data, error } = await supabase.auth.signUp({
            email: parametrosAuth.correo,
            password: parametrosAuth.pass
        })

        if (error) {
            return null
        }

        const dataUserNew = await InsertarUsuarios({
            nombres: p.nombres,
            nro_doc: p.nro_doc,
            telefono: p.telefono,
            direccion: p.direccion,
            fecharegistro: new Date(),
            estado: 'activo',
            idauth: data.user.id,
            tipouser: p.tipouser,
            tipodoc: p.tipodoc,
            correo: p.correo
        })

        await InsertarAsignaciones({
            id_empresa: p.id_empresa,
            id_usuario: dataUserNew.id
        })

        datacheckpermisos.forEach(async (item) => {
            if (item.check) {
                let parametrospermisos = {
                    id_usuario: dataUserNew.id,
                    id_modulo: item.id
                }
                await InsertarPermisos(parametrospermisos)
            }
        })

        await supabase.auth.signOut();

    },

    eliminarUsuarios: async (p) => {
        await EliminarPersonal(p);
        const { mostrarPersonal } = get() //Volvemos a llamar a la funcion mostrarPersonal
        const { parametros } = get()
        set(mostrarPersonal(parametros))
    },

    editarUsuarios: async (p, datacheckpermisos, idempresa) => {
        await EditarUsuarios(p);
        await EliminarPermisos({ id_usuario: p.id })
        datacheckpermisos.forEach(async (item) => {
            if (item.check) {
                let parametrospermisos = {
                    id_usuario: p.id,
                    id_modulo: item.id
                }
                await InsertarPermisos(parametrospermisos)
            }
        })

        const { mostrarUsuariosTodos } = get() //Volvemos a llamar a la funcion mostrarUsuariosTodos
        set(mostrarUsuariosTodos({ _id_empresa: idempresa }))
    },

    buscarUsuarios: async (p) => {
        const response = await BuscarUsuarios(p);
        console.log(response)
        set({ dataUsuarios: response })
        return response;
    },

    mostrarModulos: async () => {
        const response = await MostrarModulos()
        console.log(response)
        set({ dataModulos: response })
        return response
    },

    dataPermisos: [],
    dataPermisosEdit: [],
    mostrarPermisos: async (p) => {
        const response = await MostrarPermisos(p)
        set({ dataPermisos: response })
        let allDocs = []
        DataModulosConfiguracion.map((element) => {
            const statePermiso = response.some((objeto) => objeto.modulos.nombre.includes(element.title))

            if (statePermiso) {
                allDocs.push({ ...element, state: true })
            } else {
                allDocs.push({ ...element, state: false })
            }

        })

        DataModulosConfiguracion.splice(0, DataModulosConfiguracion.length)
        DataModulosConfiguracion.push(...allDocs)

        return response;
    },

    mostrarPermisosEdit: async (p) => {
        const response = await MostrarPermisos(p)
        set({ dataPermisosEdit: response })
        return response;
    }


}))