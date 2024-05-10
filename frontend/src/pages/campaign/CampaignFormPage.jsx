import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCampaign } from "../../context/CampaignContext";

function CampaignFormPage() {
    const [image, setImage] = useState(null);
    const [financialGoalChecked, setFinancialGoalChecked] = useState(false);
    const [timeGoalChecked, setTimeGoalChecked] = useState(false);
    const [goalErrors, setGoalErrors] = useState([]);
    const availableTags = [
        "Educación digital",
        "Acceso a la tecnología",
        "Acceso a la información",
        "Conectividad",
        "Habilidades digitales",
        "Inclusión digital",
        "Emprendimiento tecnológico",
        "Desarrollo de software",
    ];
    const [selectedTags, setSelectedTags] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { createCampaign, errors: formErrors } = useCampaign();

    const onSubmit = handleSubmit(async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (financialGoalChecked && !data.financialGoal) {
            setGoalErrors(["Por favor, ingresa un objetivo económico"]);
            setIsSubmitting(false);
            return;
        }

        if (timeGoalChecked && !data.timeGoal) {
            setGoalErrors(["Por favor, ingresa un objetivo de tiempo"]);
            setIsSubmitting(false);
            return;
        }

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
        if (financialGoalChecked) {
            formData.append("iban", data.iban);
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
        if (selectedTags.length > 0) {
            formData.append("tags", JSON.stringify(selectedTags));
        }
        if (image) {
            formData.append("image", image);
        }

        const res = await createCampaign(formData);

        setIsSubmitting(false);

        if (res.status === 201) {
            window.location.href =
                "/campaigns/" + res.data._id + "?created=true";
        }
    });

    return (
        <div className="flex justify-center mb-10">
            <div className="mx-4 lg:w-2/3 px-10 py-5 rounded-md border border-teal-600">
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

                {goalErrors.map((error, i) => (
                    <div
                        className="bg-red-500 text-white text-sm p-2 rounded-lg my-2"
                        key={i}
                    >
                        {error}
                    </div>
                ))}

                <form onSubmit={onSubmit}>
                    <div className="md:flex gap-8">
                        <div className="md:w-1/2">
                            <h2 className="text-teal-600 text-lg font-bold mb-4">
                                Información general
                            </h2>

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

                            <label className="text-sm text-slate-500">
                                Selecciona hasta 3 etiquetas
                            </label>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {availableTags.map((tag) => (
                                    <label
                                        key={tag}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            value={tag}
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedTags([
                                                        ...selectedTags,
                                                        e.target.value,
                                                    ]);
                                                } else {
                                                    setSelectedTags(
                                                        selectedTags.filter(
                                                            (tag) =>
                                                                tag !==
                                                                e.target.value
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                        {selectedTags.includes(tag) ? (
                                            <span className="text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-teal-600 text-white rounded-full">
                                                {tag}
                                            </span>
                                        ) : (
                                            <span className="text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-white text-teal-600 rounded-full border border-teal-600">
                                                {tag}
                                            </span>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="divider bg-teal-600 w-px"></div>

                        <div className="md:w-1/2">
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
                                        onChange={() => setGoalErrors([])}
                                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                                    />

                                    <label className="text-sm text-slate-500">
                                        IBAN de la cuenta bancaria
                                    </label>
                                    <input
                                        type="text"
                                        {...register("iban")}
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
                                        onChange={() => setGoalErrors([])}
                                        className="w-full px-4 py-2 mb-4 rounded-md border border-teal-600"
                                    />

                                    <label className="text-sm text-slate-500">
                                        Periodo de recibimiento
                                    </label>
                                    <div className="md:flex items-center mb-4">
                                        {errors.startDate && (
                                            <p className="text-red-500 text-sm mb-1">
                                                Por favor, ingresa una fecha de
                                                inicio
                                            </p>
                                        )}
                                        <p className="text-sm text-slate-500 mr-2">
                                            Desde
                                        </p>
                                        <input
                                            type="date"
                                            {...register("startDate")}
                                            className="w-full px-4 py-2 rounded-md border border-teal-600"
                                        />

                                        {errors.endDate && (
                                            <p className="text-red-500 text-sm mb-1">
                                                Por favor, ingresa una fecha de
                                                fin
                                            </p>
                                        )}
                                        <p className="text-sm text-slate-500 md:mx-2">
                                            hasta
                                        </p>
                                        <input
                                            type="date"
                                            {...register("endDate")}
                                            className="w-full px-4 py-2 rounded-md border border-teal-600"
                                        />
                                    </div>
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
