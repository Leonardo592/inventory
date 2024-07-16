import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export const InsertarCategorias = async (p) => {

    const { error } = await supabase.rpc("insertarcategorias", p)
    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            footer: '<a href="">Agregue una nueva descripcion</a>',
        });
    }
}

export const MostrarCategorias = async (p) => {
    const { data } = await supabase
        .from('categorias')
        .select()
        .eq("id_empresa", p.id_empresa)
        .order("id", { ascending: true })

    return data
}

// export const EliminarCategorias = async (p) => {
//     const { error } = await supabase
//         .from('categorias')
//         .delete()
//         .eq("id", p.id)

//     if (error) {
//         alert('Error al eliminar', error)
//     }
// }

export const EliminarCategorias = async (ids) => {
    const { error } = await supabase
        .from('categorias')
        .delete()
        .in("id", ids)

    if (error) {
        alert('Error al eliminar', error.message)
    }
}

export const EditarCategorias = async (p) => {
    const { error } = await supabase
        .from('categorias')
        .update(p)
        .eq("id", p.id)

    if (error) {
        alert('Error al eliminar', error)
    }
}

export const BuscarCategorias = async (p) => {
    const { data } = await supabase
        .from('categorias')
        .select()
        .eq('id_empresa', p.id_empresa)
        .ilike("descripcion", "%" + p.descripcion + "%")
    return data
}