import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export const InsertarMarca = async ({ _descripcion, _idempresa }) => {

    try {
        // Verificar si la descripción ya existe en la tabla
        const { data: existingMarca, error: existingError } = await supabase
            .from('marca')
            .select('id')
            .eq('descripcion', _descripcion)
            .eq('id_empresa', _idempresa)
            .maybeSingle()

        if (existingError) {
            throw new Error(`Error al verificar la descripción existente: ${existingError.message}`);
        }

        if (existingMarca) {
            throw new Error('¡La descripción ya existe en la tabla de marcas!');
        }

        // Si la descripción no existe, insertar la nueva marca
        const { data, error } = await supabase
            .from('marca')
            .insert([{ descripcion: _descripcion, id_empresa: _idempresa }]);

        if (error) {
            throw new Error(`Error al insertar marca: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Ops ...",
            text: error.message,
            icon: "error"
        });
        throw error;
    }
}

export const MostrarMarca = async (p) => {
    const { data } = await supabase
        .from('marca')
        .select()
        .eq("id_empresa", p.id_empresa)
        .order("id", { ascending: true })

    return data
}

export const EliminarMarca = async (p) => {
    const { error } = await supabase
        .from('marca')
        .delete()
        .eq("id", p.id)

    if (error) {
        alert('Error al eliminar', error)
    }
}

export const EditarMarca = async (p) => {
    const { error } = await supabase
        .from('marca')
        .update(p)
        .eq("id", p.id)

    if (error) {
        alert('Error al eliminar', error)
    }
}

export const BuscarMarca = async (p) => {
    const { data } = await supabase
        .from('marca')
        .select()
        .eq('id_empresa', p.id_empresa)
        .ilike("descripcion", "%" + p.descripcion + "%")
    return data
}