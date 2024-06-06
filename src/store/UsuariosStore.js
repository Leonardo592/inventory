import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import { InsertarUsuarios, MostrarUsuarios } from "../supabase/crudUsuarios";


export const useUsuariosStore = create((set, get) => ({

    insertarUsuarioAdmin: async (p) => {
        const { data, error } = await supabase.auth.signUp({
            email: p.correo,
            password: p.pass
        });

        console.log('Del user AUTH', data)

        if (error) return

        const dataUser = await InsertarUsuarios({ idauth: data.user.id, fecharegistro: new Date(), tipouser: 'admin' })

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
    }
}))