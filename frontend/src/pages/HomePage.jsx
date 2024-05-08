import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCampaign } from "../context/CampaignContext";
import CampaignCard from "../components/CampaignCard";

function HomePage() {
    const { featuredCampaigns, getFeaturedCampaigns } = useCampaign();
    const navigate = useNavigate();

    useEffect(() => {
        getFeaturedCampaigns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="grid lg:grid-cols-2">
                <div className="mt-16 mb-24 mx-4 xl:mx-32">
                    <p className="text-teal-800 text-4xl text-center font-bold">
                        Crowdfunding como remedio a la brecha digital
                    </p>
                    <p className="text-teal-800 text-lg text-center mt-8">
                        Tu contribución puede marcar la diferencia: realiza
                        donaciones económicas o de tiempo, o colabora
                        compartiendo campañas en tus redes sociales. Cada
                        pequeño gesto cuenta.
                    </p>
                    <div className="flex justify-center mt-8">
                        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold text-lg px-6 py-4 rounded-lg">
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
