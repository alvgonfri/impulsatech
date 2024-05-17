import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useCampaign } from "../../context/CampaignContext";
import CampaignCard from "../../components/CampaignCard";

function CampaignSearch() {
    const location = useLocation();
    const campaigns = location.state?.searchResults || [];
    const previousSearchParams = location.state?.searchParams || {};
    const [searchParams, setSearchParams] = useState(previousSearchParams);
    const { searchCampaigns } = useCampaign();

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
                    state: { searchResults: res.data },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto mb-10 px-4 sm:px-10 xl:px-40">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-teal-800">
                    Búsqueda de campañas
                </h1>
            </div>

            <div className="mt-4 mx-auto">
                <div className="flex items-center w-full h-12 rounded-lg border focus-within:shadow-lg bg-gray-100 overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>

                    <input
                        name="title"
                        onChange={handleChange}
                        value={searchParams.title || ""}
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
                        value={searchParams.tags || ""}
                        className="w-full rounded-lg border bg-gray-100 text-gray-700 text-sm h-12 p-2"
                    >
                        <option value="">Selecciona una etiqueta</option>
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
                        value={searchParams.deadline || ""}
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
                            value={searchParams.financialGoalMin || ""}
                            type="number"
                            placeholder="Mín"
                            className="w-full rounded-l-lg border border-teal-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                        />
                        <input
                            name="financialGoalMax"
                            onChange={handleChange}
                            value={searchParams.financialGoalMax || ""}
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
                            value={searchParams.timeGoalMin || ""}
                            type="number"
                            placeholder="Mín"
                            className="w-full rounded-l-lg border border-indigo-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                        />
                        <input
                            name="timeGoalMax"
                            onChange={handleChange}
                            value={searchParams.timeGoalMax || ""}
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
                            value={searchParams.moneyRemainingMin || ""}
                            type="number"
                            placeholder="Mín"
                            className="w-full rounded-l-lg border border-teal-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                        />
                        <input
                            name="moneyRemainingMax"
                            onChange={handleChange}
                            value={searchParams.moneyRemainingMax || ""}
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
                            value={searchParams.timeRemainingMin || ""}
                            type="number"
                            placeholder="Mín"
                            className="w-full rounded-l-lg border border-indigo-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                        />
                        <input
                            name="timeRemainingMax"
                            onChange={handleChange}
                            value={searchParams.timeRemainingMax || ""}
                            type="number"
                            placeholder="Máx"
                            className="w-full rounded-r-lg border border-indigo-500 bg-gray-100 text-gray-700 text-sm h-12 p-2"
                        />
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 pt-8 border-t border-teal-600">
                {campaigns.length === 0 ? (
                    <div className="text-gray-500 italic">
                        No se encontraron campañas
                    </div>
                ) : (
                    campaigns.map((campaign) => (
                        <CampaignCard key={campaign._id} campaign={campaign} />
                    ))
                )}
            </div>
        </div>
    );
}

export default CampaignSearch;
