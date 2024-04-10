import { useEffect } from "react";
import { useCampaign } from "../../context/CampaignContext";
import CampaignCard from "../../components/CampaignCard";

function CampaignsPage() {
    const { campaigns, getCampaigns } = useCampaign();

    useEffect(() => {
        getCampaigns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto px-20">
            <h1 className="text-3xl font-bold text-teal-800 mb-4">Campañas</h1>
            <div className="grid grid-cols-3 gap-4">
                {campaigns.map((campaign) => (
                    <CampaignCard key={campaign._id} campaign={campaign} />
                ))}
            </div>
        </div>
    );
}

export default CampaignsPage;
