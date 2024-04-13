import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signIn, isAuthenticated, errors: loginErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (data) => {
        await signIn(data);
    });

    return (
        <div className="flex justify-center">
            <div className="w-1/3 p-10 rounded-md border border-teal-600">
                <h1 className="text-teal-600 text-2xl font-bold mb-4">
                    Inicia sesión
                </h1>

                {loginErrors.map((error, i) => (
                    <div
                        className="bg-red-500 text-white text-sm p-2 rounded-lg my-2"
                        key={i}
                    >
                        {error}
                    </div>
                ))}

                <form onSubmit={onSubmit}>
                    {errors.email && (
                        <p className="text-red-500 text-sm mb-1">
                            Por favor, ingresa un correo electrónico
                        </p>
                    )}
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Correo electrónico"
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mb-1">
                            Por favor, ingresa una contraseña
                        </p>
                    )}
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Contraseña"
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />
                    <div className="flex justify-center mb-4">
                        <button
                            type="submit"
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
                <p className="text-teal-600 flex gap-x-2 justify-between">
                    ¿No estás registrado?
                    <Link to="/register" className="text-sky-500">
                        ¡Crea una cuenta!
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
