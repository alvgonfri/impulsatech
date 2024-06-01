import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCampaign } from "../../context/CampaignContext";
import BackButton from "../../components/BackButton";
import ReceivedDonationCard from "../../components/ReceivedDonationCard";

function CampaignDonations() {
    const [campaign, setCampaign] = useState({});
    const { subject } = useAuth();
    const {
        getCampaign,
        campaignFinancialDonations,
        campaignTimeDonations,
        getCampaignDonations,
    } = useCampaign();
    const params = useParams();

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
        getCampaignDonations(params.id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto mb-10 px-4 sm:px-10 xl:px-40 flex flex-col">
            <div className="text-left mb-2">
                <BackButton />
            </div>
            <h2 className="text-3xl font-bold text-teal-800 mb-4">
                Donaciones de la campaña {campaign.title}
            </h2>

            {campaign.financialGoal && campaign.timeGoal && (
                <div className="lg:flex lg:gap-x-14">
                    <div className="lg:w-1/2">
                        <h4 className="text-xl text-center font-bold text-teal-800 mb-4">
                            Donaciones económicas
                        </h4>
                        <div>
                            {campaignFinancialDonations.length === 0 ? (
                                <p className="text-gray-500 italic">
                                    No hay donaciones económicas
                                </p>
                            ) : (
                                campaignFinancialDonations.map((donation) => (
                                    <ReceivedDonationCard
                                        key={donation._id}
                                        donation={donation}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <h4 className="text-xl text-center font-bold text-teal-800 mb-4 mt-4 lg:mt-0">
                            Donaciones de tiempo
                        </h4>
                        <div>
                            {campaignTimeDonations.length === 0 ? (
                                <p className="text-gray-500 italic">
                                    No hay donaciones de tiempo
                                </p>
                            ) : (
                                campaignTimeDonations.map((donation) => (
                                    <ReceivedDonationCard
                                        key={donation._id}
                                        donation={donation}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {campaign.financialGoal && !campaign.timeGoal && (
                <div>
                    <h4 className="text-xl text-center font-bold text-teal-800 mb-4">
                        Donaciones económicas
                    </h4>
                    <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-2">
                        {campaignFinancialDonations.length === 0 ? (
                            <p className="text-gray-500 italic">
                                No hay donaciones económicas
                            </p>
                        ) : (
                            campaignFinancialDonations.map((donation) => (
                                <ReceivedDonationCard
                                    key={donation._id}
                                    donation={donation}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}

            {!campaign.financialGoal && campaign.timeGoal && (
                <div>
                    <h4 className="text-xl text-center font-bold text-teal-800 mb-4">
                        Donaciones de tiempo
                    </h4>
                    <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-2">
                        {campaignTimeDonations.length === 0 ? (
                            <p className="text-gray-500 italic">
                                No hay donaciones de tiempo
                            </p>
                        ) : (
                            campaignTimeDonations.map((donation) => (
                                <ReceivedDonationCard
                                    key={donation._id}
                                    donation={donation}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CampaignDonations;
