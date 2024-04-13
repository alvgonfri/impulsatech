import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCampaign } from "../../context/CampaignContext";

function CampaignFormPage() {
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [financialGoalChecked, setFinancialGoalChecked] = useState(false);
    const [timeGoalChecked, setTimeGoalChecked] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { createCampaign, errors: formErrors } = useCampaign();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const timeGoalPeriod = {
            startDate: data.startDate,
            endDate: data.endDate,
        };

        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);

        if (data.financialGoal) {
            formData.append("financialGoal", data.financialGoal);
        }
        if (data.timeGoal) {
            formData.append("timeGoal", data.timeGoal);
        }
        if (timeGoalChecked) {
            formData.append("timeGoalPeriod", JSON.stringify(timeGoalPeriod));
        }
        if (data.deadline) {
            formData.append("deadline", data.deadline);
        }
        if (image) {
            formData.append("image", image);
        }

        const status = await createCampaign(formData);

        setIsSubmitting(false);

        if (status === 201) {
            navigate("/campaigns");
        }
    });

    return (
        <div className="flex justify-center">
            <div className="w-1/3 p-10 rounded-md border border-teal-600">
                <h1 className="text-teal-600 text-2xl font-bold mb-4">
                    Crea una campaña
                </h1>

                {formErrors.map((error, i) => (
                    <div
                        className="bg-red-500 text-white text-sm p-2 rounded-lg my-2"
                        key={i}
                    >
                        {error}
                    </div>
                ))}

                <form onSubmit={onSubmit}>
                    <div>
                        <div>
                            {errors.title && (
                                <p className="text-red-500 text-sm mb-1">
                                    Por favor, ingresa un título
                                </p>
                            )}
                            <label className="text-sm text-slate-500">
                                Título
                            </label>
                            <input
                                type="text"
                                {...register("title", { required: true })}
                                autoFocus
                                className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                            />

                            {errors.description && (
                                <p className="text-red-500 text-sm mb-1">
                                    Por favor, ingresa una descripción
                                </p>
                            )}
                            <label className="text-sm text-slate-500">
                                Descripción
                            </label>
                            <textarea
                                {...register("description", { required: true })}
                                rows={3}
                                className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                            />

                            <label className="text-sm text-slate-500">
                                Imagen
                            </label>
                            <input
                                type="file"
                                {...register("image")}
                                className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />

                            <label className="text-sm text-slate-500">
                                Fecha límite
                            </label>
                            <input
                                type="date"
                                {...register("deadline")}
                                className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-teal-600 text-lg font-bold mb-4">
                                Objetivos
                            </h2>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={financialGoalChecked}
                                    onChange={() =>
                                        setFinancialGoalChecked(
                                            !financialGoalChecked
                                        )
                                    }
                                    className="mr-2 leading-tight"
                                />
                                <span className="text-sm text-gray-700">
                                    Objetivo económico
                                </span>
                            </label>
                            {financialGoalChecked && (
                                <div>
                                    <label className="text-sm text-slate-500">
                                        Objetivo económico (€)
                                    </label>
                                    <input
                                        type="number"
                                        {...register("financialGoal")}
                                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                                    />

                                    <label className="text-sm text-slate-500">
                                        Cuenta bancaria
                                    </label>
                                    <input
                                        type="text"
                                        {...register("bankAccount")}
                                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                                    />
                                </div>
                            )}

                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={timeGoalChecked}
                                    onChange={() =>
                                        setTimeGoalChecked(!timeGoalChecked)
                                    }
                                    className="mr-2 leading-tight"
                                />
                                <span className="text-sm text-gray-700">
                                    Objetivo de tiempo
                                </span>
                            </label>
                            {timeGoalChecked && (
                                <div>
                                    <label className="text-sm text-slate-500">
                                        Objetivo de tiempo (horas)
                                    </label>
                                    <input
                                        type="number"
                                        {...register("timeGoal")}
                                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                                    />

                                    {errors.startDate && (
                                        <p className="text-red-500 text-sm mb-1">
                                            Por favor, ingresa una fecha de
                                            inicio
                                        </p>
                                    )}
                                    <label className="text-sm text-slate-500">
                                        Fecha de inicio
                                    </label>
                                    <input
                                        type="date"
                                        {...register("startDate")}
                                        placeholder="Fecha de inicio"
                                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                                    />

                                    {errors.endDate && (
                                        <p className="text-red-500 text-sm mb-1">
                                            Por favor, ingresa una fecha de fin
                                        </p>
                                    )}
                                    <label className="text-sm text-slate-500">
                                        Fecha de fin
                                    </label>
                                    <input
                                        type="date"
                                        {...register("endDate")}
                                        placeholder="Fecha de fin"
                                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center my-4">
                        <button
                            type="submit"
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Creando campaña..."
                                : "Crear campaña"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CampaignFormPage;
