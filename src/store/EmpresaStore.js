import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import { ContarUsuariosPorEmpresa, MostrarEmpresa } from "../supabase/crudEmpresa";


export const useEmpresaStore = create((set, get) => ({

    contadorusuarios: 0,
    dataempresa: [],
    mostrarEmpresa: async (p) => {
        // try {
        //     console.log('dedededede', p)

        //     const response = await MostrarEmpresa(p);

        //     console.log(response);

        //     set({ dataEmpresa: response });

        //     return response; // Asegúrate de devolver los datos aquí
        // } catch (error) {
        //     console.error('Error en mostrarUsuarios:', error);
        //     throw error; // Asegúrate de manejar el error adecuadamente
        // }



        const response = await MostrarEmpresa(p);

        console.log(response)
        set({ dataempresa: response });
        return response;

        // set({ dataempresa: response.empresa });
        // return response.empresa;
    },

    contarUsuariosPorEmpresa: async (p) => {
        // const response = await ContarUsuariosPorEmpresa(p)

        // console.log('fhfdjdffadfa', p)

        // set({ contadorUsuarios: response })

        // return response

        const response = await ContarUsuariosPorEmpresa(p)
        set({ contadorusuarios: response });
        return response;

    }

}))