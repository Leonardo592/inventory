import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export const InsertarProductos = async (p) => {

    const { error } = await supabase.rpc("insertarproductos", p)
    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            footer: '<a href="">Agregue una nueva descripcion</a>',
        });
    }
}

export const MostrarProductos = async (p) => {
    const { data } = await supabase.rpc('mostrarproductos', p)

    console.log(data)

    return data
}

export const EliminarProductos = async (p) => {
    const { error } = await supabase
        .from('productos')
        .delete()
        .eq("id", p.id)

    if (error) {
        alert('Error al eliminar', error)
    }
}

export const EditarProductos = async (p) => {
    const { error } = await supabase
        .from('productos')
        .update(p)
        .eq("id", p.id)

    if (error) {
        alert('Error al eliminar', error)
    }
}

export const BuscarProductos = async (p) => {
    const { data } = await supabase.rpc('buscarproductos', p)
    return data
}