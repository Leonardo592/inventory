import { create } from "zustand";
import { BuscarCategorias, EditarCategorias, EliminarCategorias, InsertarCategorias, MostrarCategorias } from "../supabase/crudCategorias";

export const useCategoriasStore = create((set, get) => ({
    buscador: "",
    setBuscador: (p) => {
        set({ buscador: p })
    },
    dataCategorias: [],
    categoriasItemSelect: [],
    parametros: {},

    mostrarCategorias: async (p) => {
        const response = await MostrarCategorias(p);

        set({ parametros: p })
        set({ dataCategorias: response })
        set({ categoriasItemSelect: response[0] })

        return response;
    },

    selectCategorias: (p) => {
        set({ categoriasItemSelect: p })
    },

    insertarCategorias: async (p) => {
        console.log(p)
        await InsertarCategorias(p);
        const { mostrarCategorias } = get() //Volvemos a llamar a la funcion mostrarCategorias
        const { parametros } = get()
        set(mostrarCategorias(parametros))

    },

    // eliminarCategorias: async (p) => {
    //     await EliminarCategorias(p);
    //     const { mostrarCategorias } = get() //Volvemos a llamar a la funcion mostrarCategorias
    //     const { parametros } = get()
    //     set(mostrarCategorias(parametros))
    // },

    eliminarCategorias: async (p) => {
        await EliminarCategorias([p.id]);
        const { mostrarCategorias } = get(); // Volvemos a llamar a la función mostrarCategorias
        const { parametros } = get();
        set(mostrarCategorias(parametros));
    },

    eliminarCategoriasMultiples: async (ids) => {
        await EliminarCategorias(ids);
        const { mostrarCategorias } = get();
        const { parametros } = get();
        set(mostrarCategorias(parametros));
    },

    editarCategorias: async (p) => {
        await EditarCategorias(p);
        const { mostrarCategorias } = get() //Volvemos a llamar a la funcion mostrarCategorias
        const { parametros } = get()
        set(mostrarCategorias(parametros))
    },

    buscarCategorias: async (p) => {
        const response = await BuscarCategorias(p);
        console.log(response)
        set({ dataCategorias: response })

    }
}))