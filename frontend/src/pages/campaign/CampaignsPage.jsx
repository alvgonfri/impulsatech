import { useEffect } from "react";
import { useCampaign } from "../../context/CampaignContext";

function CampaignsPage() {
    const { campaigns, getCampaigns } = useCampaign();

    useEffect(() => {
        getCampaigns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto px-20">
            <h1 className="text-3xl font-bold text-teal-800 mb-8">Campañas</h1>
            <div className="grid grid-cols-2 gap-4">
                {campaigns.map((campaign) => (
                    <div
                        key={campaign._id}
                        className="bg-teal-100 mb-4 border border-teal-600 rounded-md p-4"
                    >
                        <h1 className="text-teal-800 text-xl font-bold">
                            {campaign.title}
                        </h1>
                        <p className="text-teal-600">{campaign.description}</p>
                        <a
                            href={`/campaigns/${campaign._id}`}
                            className="text-teal-800 font-semibold"
                        >
                            Ver más
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CampaignsPage;
