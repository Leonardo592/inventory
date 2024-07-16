import Swal from "sweetalert2"
import { supabase } from "./supabase.config"
import { obtenerIdAuthSupabase } from "./globalSupabase";

export const InsertarUsuarios = async (p) => {
    const { data, error } = await supabase.from("usuarios").insert(p).select().maybeSingle()

    if (error) {
        Swal.fire({
            title: "Ops ...",
            text: "Error al insertar usuario " + error.message,
            icon: "error"
        });
    }

    if (data) return data
}

export const MostrarUsuarios = async () => {
    const idAuthSupabase = await obtenerIdAuthSupabase()
    const { error, data } = await supabase.from('usuarios').select().eq('idauth', idAuthSupabase).maybeSingle();

    if (data) {
        return data
    }
}

export const MostrarUsuariosTodos = async (p) => {
    const { error, data } = await supabase.rpc('mostrarpersonal', p)

    if (data) {
        return data
    }
}

export const EliminarUsuarios = async (p) => {
    const { error } = await supabase
        .from('usuarios')
        .delete()
        .eq("id", p.id)

    if (error) {
        alert('Error al eliminar', error)
    }
}

export const EditarUsuarios = async (p) => {
    const { error } = await supabase
        .from('usuarios')
        .update(p)
        .eq("id", p.id)

    if (error) {
        alert('Error al eliminar', error)
    }
}

export const BuscarUsuarios = async (p) => {
    const { data } = await supabase.rpc('buscarpersonal', p)
    return data
}

//TABLA DE ASIGNACIONES
export const InsertarAsignaciones = async (p) => {
    const { data, error } = await supabase.from("asignarempresa").insert(p)

    if (error) {
        Swal.fire({
            title: "Ops ...",
            text: "Error al insertar usuario " + error.message,
            icon: "error"
        });
    }

    if (data) return data
}


//TABLA DE PERMISOS
export const InsertarPermisos = async (p) => {
    const { data, error } = await supabase.from("permisos").insert(p)

    if (error) {
        Swal.fire({
            title: "Ops ...",
            text: "Error al insertar usuario " + error.message,
            icon: "error"
        });
    }

    if (data) return data
}


export const MostrarPermisos = async (p) => {
    const { data, error } = await supabase
        .from("permisos")
        .select(`id, id_usuario, id_modulo, modulos(nombre)`)
        .eq('id_usuario', p.id_usuario)

    // console.log(data)

    return data;
}


export const EliminarPermisos = async (p) => {
    const { data, error } = await supabase
        .from("permisos")
        .delete()
        .eq('id_usuario', p.id_usuario)

    if (error) {
        alert('Error al eliminar', error)
    }
}

export async function MostrarModulos() {

    const { data } = await supabase.from("modulos").select();

    console.log(data)

    return data;

}