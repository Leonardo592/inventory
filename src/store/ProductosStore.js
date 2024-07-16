import { create } from "zustand";
import { BuscarProductos, EditarProductos, EliminarProductos, InsertarProductos, MostrarProductos } from "../supabase/crudProductos";

export const useProductosStore = create((set, get) => ({
    buscador: "",
    setBuscador: (p) => {
        set({ buscador: p })
        console.log(p)
    },
    dataProductos: [],
    productosItemSelect: [],
    parametros: {},

    mostrarProductos: async (p) => {
        const response = await MostrarProductos(p);

        set({ parametros: p })
        set({ dataProductos: response })
        // set({ productosItemSelect: response[0] })
        set({ productosItemSelect: [] });

        return response;
    },

    // selectProductos: (p) => {
    //     set({ productosItemSelect: p })
    // },

    selectProductos: (p) => {
        set({ productosItemSelect: p }); // Seleccionar el nuevo producto
    },

    insertarProductos: async (p) => {
        console.log(p)
        await InsertarProductos(p);
        const { mostrarProductos } = get() //Volvemos a llamar a la funcion mostrarProductos
        const { parametros } = get()
        set(mostrarProductos(parametros))

    },

    eliminarProductos: async (p) => {
        await EliminarProductos(p);
        const { mostrarProductos } = get() //Volvemos a llamar a la funcion mostrarProductos
        const { parametros } = get()
        set(mostrarProductos(parametros))
    },

    editarProductos: async (p) => {
        await EditarProductos(p);
        const { mostrarProductos } = get() //Volvemos a llamar a la funcion mostrarProductos
        const { parametros } = get()
        set(mostrarProductos(parametros))
    },

    buscarProductos: async (p) => {
        const response = await BuscarProductos(p);
        console.log(response)
        set({ dataProductos: response })

    }
}))