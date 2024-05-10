import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function RegisterPage() {
    const [picture, setPicture] = useState(null);
    const [isOrganization, setIsOrganization] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

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

        const formData = new FormData();

        Object.keys(trimmedData).forEach((key) => {
            formData.append(key, trimmedData[key]);
        });

        if (picture) {
            formData.append("picture", picture);
        }

        if (isOrganization) {
            await signUpOrganization(formData);
        } else {
            await signUp(formData);
        }

        setIsSubmitting(false);
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
                        <p className="text-red-500 text-sm">
                            Por favor, ingresa un nombre
                        </p>
                    )}
                    <label className="text-sm text-slate-500">
                        {isOrganization
                            ? "Nombre de la organización"
                            : "Nombre"}
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="w-full px-4 py-2 mb-2 rounded-md border border-teal-600"
                    />

                    {!isOrganization && (
                        <>
                            {errors.surname && (
                                <p className="text-red-500 text-sm">
                                    Por favor, ingresa un apellido
                                </p>
                            )}
                            <label className="text-sm text-slate-500">
                                Apellido
                            </label>
                            <input
                                type="text"
                                {...register("surname", { required: true })}
                                className="w-full px-4 py-2 mb-2 rounded-md border border-teal-600"
                            />
                        </>
                    )}

                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            Por favor, ingresa un correo electrónico
                        </p>
                    )}
                    <label className="text-sm text-slate-500">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full px-4 py-2 mb-2 rounded-md border border-teal-600"
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            Por favor, ingresa una contraseña
                        </p>
                    )}
                    <label className="text-sm text-slate-500">Contraseña</label>
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="w-full px-4 py-2 mb-2 rounded-md border border-teal-600"
                    />

                    <label className="text-sm text-slate-500">Teléfono</label>
                    <input
                        type="tel"
                        {...register("phone")}
                        className="w-full px-4 py-2 mb-2 rounded-md border border-teal-600"
                    />

                    <label className="text-sm text-slate-500">Biografía</label>
                    <textarea
                        {...register("bio")}
                        className="w-full px-4 py-2 mb-2 rounded-md border border-teal-600"
                    />

                    <label className="text-sm text-slate-500">
                        Foto de perfil
                    </label>
                    <input
                        type="file"
                        {...register("picture")}
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                        accept="image/*"
                        onChange={(e) => setPicture(e.target.files[0])}
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
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Registrando..." : "Registrarse"}
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
