import { create } from "zustand";
import { BuscarKardex, EliminarKardex, InsertarKardex, MostrarKardex } from "../supabase/crudKardex";

export const useKardexStore = create((set, get) => ({
    buscadorKardex: "",
    setBuscadorKardex: (p) => {
        set({ buscadorKardex: p })
    },
    dataKardex: [],
    kardexItemSelect: [],
    parametros: {},

    mostrarKardex: async (p) => {
        const response = await MostrarKardex(p);

        set({ parametros: p })
        set({ dataKardex: response })

        return response;
    },

    selectKardex: (p) => {
        set({ kardexItemSelect: p })
    },

    insertarKardex: async (p) => {
        console.log(p)
        await InsertarKardex(p);
        const { mostrarKardex } = get() //Volvemos a llamar a la funcion mostrarKardex
        const { parametros } = get()
        set(mostrarKardex(parametros))

    },

    eliminarKardex: async (p) => {
        await EliminarKardex(p);
        const { mostrarKardex } = get() //Volvemos a llamar a la funcion mostrarKardex
        const { parametros } = get()
        set(mostrarKardex(parametros))
    },

    editarKardex: async (p) => {
        await EditarKardex(p);
        const { mostrarKardex } = get() //Volvemos a llamar a la funcion mostrarKardex
        const { parametros } = get()
        set(mostrarKardex(parametros))
    },

    buscarKardex: async (p) => {
        const response = await BuscarKardex(p);
        console.log(response)
        set({ dataKardex: response })

    }
}))