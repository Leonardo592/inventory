import { create } from "zustand";
import { BuscarMarca, EditarMarca, EliminarMarca, InsertarMarca, MostrarMarca } from "../supabase/crudMarca";

export const useMarcaStore = create((set, get) => ({
    buscador: "",
    setBuscador: (p) => {
        set({ buscador: p })
    },
    dataMarca: [],
    marcaItemSelect: [],
    parametros: {},

    mostrarMarca: async (p) => {
        const response = await MostrarMarca(p);

        set({ parametros: p })
        set({ dataMarca: response })
        set({ marcaItemSelect: response[0] })

        return response;
    },

    selectMarca: (p) => {
        set({ marcaItemSelect: p })
    },

    insertarMarca: async (p) => {
        console.log(p)
        await InsertarMarca(p);
        const { mostrarMarca } = get() //Volvemos a llamar a la funcion mostrarMarca
        const { parametros } = get()
        set(mostrarMarca(parametros))

    },

    eliminarMarca: async (p) => {
        await EliminarMarca(p);
        const { mostrarMarca } = get() //Volvemos a llamar a la funcion mostrarMarca
        const { parametros } = get()
        set(mostrarMarca(parametros))
    },

    editarMarca: async (p) => {
        await EditarMarca(p);
        const { mostrarMarca } = get() //Volvemos a llamar a la funcion mostrarMarca
        const { parametros } = get()
        set(mostrarMarca(parametros))
    },

    buscarMarca: async (p) => {
        const response = await BuscarMarca(p);
        console.log(response)
        set({ dataMarca: response })

    }
}))