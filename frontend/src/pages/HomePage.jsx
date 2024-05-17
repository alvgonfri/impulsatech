import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useCampaign } from "../context/CampaignContext";
import CampaignCard from "../components/CampaignCard";

function HomePage() {
    const [searchParams, setSearchParams] = useState({
        title: "",
        tags: "",
        deadline: "",
        financialGoalMin: "",
        financialGoalMax: "",
        timeGoalMin: "",
        timeGoalMax: "",
        moneyRemainingMin: "",
        moneyRemainingMax: "",
        timeRemainingMin: "",
        timeRemainingMax: "",
    });
    const { featuredCampaigns, getFeaturedCampaigns, searchCampaigns } =
        useCampaign();
    const navigate = useNavigate();

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

    useEffect(() => {
        getFeaturedCampaigns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = async () => {
        try {
            const res = await searchCampaigns(searchParams);

            if (res.status === 200) {
                navigate("/campaigns/search", {
                    state: { searchResults: res.data, searchParams },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="grid lg:grid-cols-2 lg:gap-16">
                <div className="mt-16 mb-8 lg:mb-24 mx-4 xl:ml-32">
                    <h2 className="text-teal-800 text-4xl text-center font-bold">
                        Crowdfunding como remedio a la brecha digital
                    </h2>
                    <p className="text-teal-800 text-lg text-center mt-8">
                        Tu contribución puede marcar la diferencia: realiza
                        donaciones económicas o de tiempo, o colabora
                        compartiendo campañas en tus redes sociales. Cada
                        pequeño gesto cuenta.
                    </p>
                    <div className="flex justify-center mt-8">
                        <button
                            className="bg-teal-500 hover:bg-teal-600 text-white font-bold text-lg px-6 py-4 rounded-lg"
                            onClick={() => navigate("/information")}
                        >
                            Más información
                        </button>
                        <button
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg px-6 py-4 rounded-lg ml-4"
                            onClick={() => navigate("/campaigns")}
                        >
                            Ver campañas
                        </button>
                    </div>
                </div>

                <div className="mt-8 mb-24 mx-4 xl:mr-32">
                    <h3 className="text-teal-800 text-2xl text-center font-semibold">
                        Encuentra la campaña que estás buscando
                    </h3>
                    <div className="mt-4 mx-auto">
                        <div className="flex items-center w-full h-12 rounded-lg border focus-within:shadow-lg bg-gray-100 overflow-hidden">
                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                <FontAwesomeIcon icon={faSearch} />
                            </div>

                            <input
                                name="title"
                                onChange={handleChange}
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-gray-100"
                                type="text"
                                placeholder="Buscar campañas"
                            />

                            <button
                                onClick={handleSearch}
                                className="h-full px-4 bg-gray-400 hover:bg-gray-500 text-white font-semibold text-lg"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                htmlFor="search"
                                className="block text-sm text-gray-700"
                            >
                                Etiqueta
                            </label>
                            <select
                                name="tags"
                                onChange={handleChange}
                                className="w-full rounded-lg border bg-gray-100 text-gray-700 text-sm h-12 p-2"
                            >
                                <option value="">
                                    Selecciona una etiqueta
                                </option>
                                {availableTags.map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="search"
                                className="block text-sm text-gray-700"
                            >
                                Fecha límite
                            </label>
                            <input
                                name="deadline"
                                onChange={handleChange}
                                type="date"
                                className="w-full rounded-lg border bg-gray-100 text-gray-700 text-sm h-12 p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                htmlFor="search"
                                className="block text-sm text-gray-700"
                            >
                                Objetivo económico
                            </label>
                            <div className="flex">
                                <input
                                    name="financialGoalMin"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Mín"
                                    className="w-full rounded-l-lg border border-teal-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                                />
                                <input
                                    name="financialGoalMax"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Máx"
                                    className="w-full rounded-r-lg border border-teal-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="search"
                                className="block text-sm text-gray-700"
                            >
                                Objetivo de tiempo
                            </label>
                            <div className="flex">
                                <input
                                    name="timeGoalMin"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Mín"
                                    className="w-full rounded-l-lg border border-indigo-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                                />
                                <input
                                    name="timeGoalMax"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Máx"
                                    className="w-full rounded-r-lg border border-indigo-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                htmlFor="search"
                                className="block text-sm text-gray-700"
                            >
                                Dinero restante
                            </label>
                            <div className="flex">
                                <input
                                    name="moneyRemainingMin"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Mín"
                                    className="w-full rounded-l-lg border border-teal-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                                />
                                <input
                                    name="moneyRemainingMax"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Máx"
                                    className="w-full rounded-r-lg border border-teal-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="search"
                                className="block text-sm text-gray-700"
                            >
                                Tiempo restante
                            </label>
                            <div className="flex">
                                <input
                                    name="timeRemainingMin"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Mín"
                                    className="w-full rounded-l-lg border border-indigo-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                                />
                                <input
                                    name="timeRemainingMax"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Máx"
                                    className="w-full rounded-r-lg border border-indigo-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-teal-600 py-8 px-8 xl:px-40">
                <p className="text-white text-2xl text-center font-bold mb-8">
                    Campañas destacadas
                </p>
                <div className="grid lg:grid-cols-3 gap-4">
                    {featuredCampaigns.map((campaign) =>
                        campaign.eliminated ? null : (
                            <CampaignCard
                                key={campaign._id}
                                campaign={campaign}
                            />
                        )
                    )}
                </div>
            </div>
        </>
    );
}

export default HomePage;
