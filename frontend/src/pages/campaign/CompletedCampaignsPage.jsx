import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useCampaign } from "../../context/CampaignContext";
import CampaignCard from "../../components/CampaignCard";

function CompletedCampaignsPage() {
    const { campaigns, getCampaignsByStatus } = useCampaign();
    const navigate = useNavigate();

    useEffect(() => {
        getCampaignsByStatus("completed");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto mb-10 px-4 sm:px-10 xl:px-40">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold text-teal-800">
                    Campañas completadas
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
                    to="/campaigns"
                    className="text-teal-800 underline hover:opacity-65 transition duration-500"
                >
                    Ver en curso
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
        </div>
    );
}

export default CompletedCampaignsPage;
