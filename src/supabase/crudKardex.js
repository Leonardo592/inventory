import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export const InsertarKardex = async (p) => {

    const { error } = await supabase.from('kardex').insert(p)
    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            footer: '<a href="">Agregue una nueva descripcion</a>',
        });
    }
}

export const MostrarKardex = async (p) => {
    const { data, error } = await supabase.rpc('mostarkardexporempresa', p);

    if (error) {
        console.error('Error fetching Kardex data:', error);
        throw error;
    }

    return data;
}

export const EliminarKardex = async (p) => {
    const { error } = await supabase
        .from('kardex')
        .delete()
        .eq("id", p.id)

    if (error) {
        alert('Error al eliminar', error)
    }
}

export const BuscarKardex = async (p) => {
    const { data } = await supabase.rpc('buscarkardexporempresa', p)
    return data
}