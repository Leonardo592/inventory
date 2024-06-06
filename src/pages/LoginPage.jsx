import { useAuthStore } from "../store/AuthStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { RegisterPage } from "./RegisterPage";
import { Modal } from "../components/Modal";

export function LoginPage() {
    const { signInWithEmail } = useAuthStore();
    const { signInWithGoogle } = useAuth();
    const [stateInicio, setStateInicio] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    async function iniciar(data) {
        const response = await signInWithEmail({
            correo: data.correo,
            pass: data.pass,
        });
        if (response) {
            navigate("/");
        } else {
            setStateInicio(true);
        }
    }

    const [parent] = useAutoAnimate({
        duration: 500,
        easing: 'ease-in-out'
    });

    return (
        <div ref={parent} className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transform transition-all duration-500 hover:scale-105 hover:shadow-lg">

                {stateInicio && (
                    <h3 className="text-red-500 mb-4">Datos incorrectos</h3>
                )}
                <form className="space-y-6" onSubmit={handleSubmit(iniciar)}>
                    <h1 className="text-4xl font-bold text-center text-gray-800">Bienvenido</h1>
                    <h2 className="text-2xl font-bold text-gray-800">Inicia sesión o registrate</h2>
                    <div className="form-group">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("correo", { required: "El email es necesario" })}
                        />
                        {errors.correo && (
                            <p className="text-red-500 text-sm mt-1">{errors.correo.message}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("pass", { required: "La contraseña es necesaria" })}
                        />
                        {errors.pass && (
                            <p className="text-red-500 text-sm mt-1">{errors.pass.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <button
                    onClick={signInWithGoogle}
                    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors mt-4"
                >
                    Login with Gmail
                </button>
                <button
                    onClick={() => setShowRegister(true)}
                    className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors mt-4"
                >
                    Registrar Usuario
                </button>
            </div>
            {showRegister && (
                <Modal>
                    <RegisterPage setState={() => setShowRegister(false)} />
                </Modal>
            )}
        </div>
    );
}