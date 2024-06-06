import Swal from "sweetalert2"
import { supabase } from "./supabase.config"
import { obtenerIdAuthSupabase } from "./globalSupabase";


export const MostrarEmpresa = async (p) => {

    const { error, data } = await supabase
        .from('asignarempresa')
        .select(`empresa(id, nombre, simbolomoneda)`)
        .eq('id_usuario', p.idUsuario)
        .maybeSingle();

    if (data) {
        return data
    }

}

export const ContarUsuariosPorEmpresa = async (p) => {
    console.log(p)
    const { data, error } = await supabase.rpc("contar_usuarios_por_empresa", { _id_empresa: p.id_empresa })
    if (data) {
        return data;
    }

}