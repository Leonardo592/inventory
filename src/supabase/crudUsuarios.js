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
    const {error, data} = await supabase.from('usuarios').select().eq('idauth', idAuthSupabase).maybeSingle();

    if(data){
        return data
    }
}