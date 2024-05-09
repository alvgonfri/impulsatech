import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useCampaign } from "../../context/CampaignContext";
import CampaignCard from "../../components/CampaignCard";

function CampaignsPage() {
    const { campaigns, totalPages, getCampaignsByStatus } = useCampaign();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        getCampaignsByStatus("ongoing", page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div className="container mx-auto mb-10 px-4 sm:px-10 xl:px-40">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold text-teal-800">
                    Campañas en curso
                </h1>
                <button
                    onClick={() => navigate("/campaigns/create")}
                    className="bg-teal-700 hover:bg-teal-800 rounded-md text-white border border-white px-3 py-2 transition duration-500"
                >
                    <FontAwesomeIcon icon={faCirclePlus} />
                    <span className="hidden sm:inline"> Nueva campaña</span>
                </button>
            </div>

            <div className="flex gap-4 mb-2">
                <Link
                    to="/completed-campaigns"
                    className="text-teal-800 underline hover:opacity-65 transition duration-500"
                >
                    Ver completadas
                </Link>
                <Link
                    to="/cancelled-campaigns"
                    className="text-teal-800 underline hover:opacity-65 transition duration-500"
                >
                    Ver canceladas
                </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaigns.map((campaign) =>
                    campaign.eliminated ? null : (
                        <CampaignCard key={campaign._id} campaign={campaign} />
                    )
                )}
            </div>

            <div className="flex justify-center items-center mt-4">
                {page > 1 ? (
                    <button
                        onClick={() => setPage(page - 1)}
                        className="bg-teal-700 hover:bg-teal-800 rounded-md text-white font-bold border border-white px-3 py-1 transition duration-500"
                    >
                        {"<"}
                    </button>
                ) : (
                    <button className="bg-teal-900 rounded-md text-white font-bold border border-white px-3 py-1 cursor-not-allowed">
                        {"<"}
                    </button>
                )}

                <p className="text-teal-800 mx-4">
                    Página {page} de {totalPages}
                </p>
                {page < totalPages ? (
                    <button
                        onClick={() => setPage(page + 1)}
                        className="bg-teal-700 hover:bg-teal-800 rounded-md text-white font-bold border border-white px-3 py-1 transition duration-500"
                    >
                        {">"}
                    </button>
                ) : (
                    <button className="bg-teal-900 rounded-md text-white font-bold border border-white px-3 py-1 cursor-not-allowed">
                        {">"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default CampaignsPage;
