import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (data) => {
        const trimmedData = {};
        Object.keys(data).forEach((key) => {
            trimmedData[key] = data[key].trim();
        });

        // Verify if the phone and bio fields are empty and delete them from the data object
        if (!trimmedData.phone) {
            delete trimmedData.phone;
        }

        if (!trimmedData.bio) {
            delete trimmedData.bio;
        }

        await signUp(trimmedData);
    });

    return (
        <div className="flex justify-center">
            <div className="max-w-md p-10 rounded-md border border-teal-600">
                <h1 className="text-teal-600 text-2xl font-bold mb-4">
                    Únete a ImpulsaTech
                </h1>

                {registerErrors.map((error, i) => (
                    <div
                        className="bg-red-500 text-white text-sm p-2 rounded-lg my-2"
                        key={i}
                    >
                        {error}
                    </div>
                ))}

                <form onSubmit={onSubmit}>
                    {errors.name && (
                        <p className="text-red-500 text-sm mb-1">
                            Por favor, ingresa un nombre
                        </p>
                    )}
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Nombre"
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />

                    {errors.surname && (
                        <p className="text-red-500 text-sm mb-1">
                            Por favor, ingresa un apellido
                        </p>
                    )}
                    <input
                        type="text"
                        {...register("surname", { required: true })}
                        placeholder="Apellido"
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />

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

                    <input
                        type="tel"
                        {...register("phone")}
                        placeholder="Teléfono"
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />

                    <textarea
                        {...register("bio")}
                        placeholder="Biografía"
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />
                    <div className="flex justify-center mb-4">
                        <button
                            type="submit"
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
                <p className="text-teal-600 flex gap-x-2 justify-between">
                    ¿Ya tienes una cuenta?
                    <Link to="/login" className="text-sky-500">
                        ¡Inicia sesión!
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
