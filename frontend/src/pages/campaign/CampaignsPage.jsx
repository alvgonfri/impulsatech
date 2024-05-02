import { useEffect } from "react";
import { useCampaign } from "../../context/CampaignContext";
import CampaignCard from "../../components/CampaignCard";

function CampaignsPage() {
    const { campaigns, getCampaignsByStatus } = useCampaign();

    useEffect(() => {
        getCampaignsByStatus("ongoing");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto mb-10 px-4 sm:px-10 xl:px-40">
            <h1 className="text-3xl font-bold text-teal-800 mb-4">Campañas</h1>
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

export default CampaignsPage;
