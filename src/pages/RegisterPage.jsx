import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUsuariosStore } from "../store/UsuariosStore";
import { useMutation } from "@tanstack/react-query";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export function RegisterPage({ setState }) {
    const { insertarUsuarioAdmin } = useUsuariosStore();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (data) => {
            const p = {
                correo: data.correo,
                pass: data.pass,
            };
            const dt = await insertarUsuarioAdmin(p);
            if (dt) {
                navigate("/");
            }
        },
    });

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <div onClick={setState} className="cursor-pointer text-right text-red-500 font-bold">
                X
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Registrar Usuario</h2>
            <form className="space-y-6" onSubmit={handleSubmit(mutation.mutateAsync)}>
                <div className="form-group">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        {...register("correo", { required: "Email is required" })}
                    />
                    {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        {...register("pass", { required: "Password is required" })}
                    />
                    {errors.pass && <p className="text-red-500 text-sm mt-1">{errors.pass.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
}