import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const {
        signUp,
        signUpOrganization,
        isAuthenticated,
        errors: registerErrors,
    } = useAuth();
    const [isOrganization, setIsOrganization] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (data) => {
        const trimmedData = {};
        Object.keys(data).forEach((key) => {
            if (typeof data[key] === "string") {
                trimmedData[key] = data[key].trim();
            } else {
                trimmedData[key] = data[key];
            }
        });

        // Verify if optional fields are empty and delete them
        if (!trimmedData.phone) {
            delete trimmedData.phone;
        }

        if (!trimmedData.bio) {
            delete trimmedData.bio;
        }

        if (isOrganization) {
            await signUpOrganization(trimmedData);
        } else {
            await signUp(trimmedData);
        }
    });

    return (
        <div className="flex justify-center mb-10">
            <div className="mx-4 xl:w-1/3 p-10 rounded-md border border-teal-600">
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
                    <div className="flex justify-center mb-4">
                        <button
                            type="button"
                            onClick={() => setIsOrganization(false)}
                            className={`${
                                !isOrganization
                                    ? "bg-teal-600 text-white"
                                    : "bg-white text-teal-600"
                            } font-bold py-2 px-4 rounded`}
                        >
                            Usuario
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOrganization(true)}
                            className={`${
                                isOrganization
                                    ? "bg-teal-600 text-white"
                                    : "bg-white text-teal-600"
                            } font-bold py-2 px-4 rounded`}
                        >
                            Organización
                        </button>
                    </div>

                    {errors.name && (
                        <p className="text-red-500 text-sm mb-1">
                            Por favor, ingresa un nombre
                        </p>
                    )}
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        placeholder={
                            isOrganization
                                ? "Nombre de la organización"
                                : "Nombre"
                        }
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />

                    {!isOrganization && (
                        <>
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
                        </>
                    )}

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

                    <p className="text-teal-600 text-sm mb-4">
                        Al registrarte, aceptas nuestra{" "}
                        <Link
                            to="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500"
                        >
                            Política de Privacidad
                        </Link>{" "}
                        y nuestros{" "}
                        <Link
                            to="/terms-of-use"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500"
                        >
                            Términos de Uso
                        </Link>
                        .
                    </p>

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
