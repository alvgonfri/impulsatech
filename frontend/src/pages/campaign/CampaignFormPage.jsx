import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCampaign } from "../../context/CampaignContext";

function CampaignFormPage() {
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);

        if (data.timeGoal) {
            formData.append("timeGoal", data.timeGoal);
        }
        if (data.financialGoal) {
            formData.append("financialGoal", data.financialGoal);
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
            <div className="max-w-md p-10 rounded-md border border-teal-600">
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
                    {errors.title && (
                        <p className="text-red-500 text-sm mb-1">
                            Por favor, ingresa un título
                        </p>
                    )}
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        placeholder="Título"
                        autoFocus
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />

                    {errors.description && (
                        <p className="text-red-500 text-sm mb-1">
                            Por favor, ingresa una descripción
                        </p>
                    )}
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Descripción"
                        rows={3}
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />

                    <input
                        type="number"
                        {...register("timeGoal")}
                        placeholder="Objetivo de tiempo (horas)"
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />

                    <input
                        type="number"
                        {...register("financialGoal")}
                        placeholder="Objetivo económico (€)"
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />

                    <input
                        type="file"
                        {...register("image")}
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <input
                        type="date"
                        {...register("deadline")}
                        placeholder="Fecha límite"
                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                    />

                    <div className="flex justify-center mb-4">
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
