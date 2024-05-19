import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCampaign } from "../../context/CampaignContext";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import BackButton from "../../components/BackButton";

function PostFormPage() {
    const [campaign, setCampaign] = useState({});
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const params = useParams();
    const { subject } = useAuth();
    const { getCampaign, createPost, postErrors } = useCampaign();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        async function loadCampaign() {
            if (params.id) {
                const campaignInDB = await getCampaign(params.id);
                if (campaignInDB.promoter._id !== subject._id) {
                    window.location.href = "/campaigns";
                }

                setCampaign(campaignInDB);
            }
        }
        loadCampaign();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const formData = new FormData();

        formData.append("content", data.content);

        if (image) {
            formData.append("image", image);
        }

        formData.append("campaignId", campaign._id);

        const status = await createPost(formData);

        setIsSubmitting(false);

        if (status === 201) {
            window.location.href = `/campaigns/${campaign._id}?postCreated=true`;
        }
    });

    return (
        <div className="mb-10">
            <div className="ml-4 lg:ml-40">
                <BackButton />
            </div>
            <div className="flex justify-center">
                <div className="mx-4 lg:w-1/3 p-10 rounded-md border border-teal-600">
                    <h1 className="text-teal-600 text-xl font-semibold mb-4">
                        Crea un post para{" "}
                        <span className="font-bold">{campaign.title}</span>
                    </h1>

                    {postErrors.map((error, i) => (
                        <div
                            className="bg-red-500 text-white text-sm p-2 rounded-lg my-1"
                            key={i}
                        >
                            {error}
                        </div>
                    ))}

                    <form onSubmit={onSubmit}>
                        {errors.content && (
                            <p className="text-red-500 text-sm mb-1">
                                Por favor, ingresa el contenido del post
                            </p>
                        )}
                        <label className="text-sm text-slate-500">
                            Contenido
                        </label>
                        <textarea
                            {...register("content", { required: true })}
                            rows={3}
                            className="w-full px-4 py-2 rounded-md border border-teal-600"
                        />

                        <label className="text-sm text-slate-500">Imagen</label>
                        <input
                            type="file"
                            {...register("image")}
                            className="w-full px-4 py-2 mb-8 rounded-md border border-teal-600"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Publicando..." : "Publicar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostFormPage;
