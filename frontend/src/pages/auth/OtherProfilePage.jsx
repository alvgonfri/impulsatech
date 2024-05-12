import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useSubject } from "../../context/SubjectContext";
import { useCampaign } from "../../context/CampaignContext";
import CampaignStateCard from "../../components/CampaignStateCard";

function OtherProfilePage() {
    const { subject, getSubject } = useSubject();
    const { promoterCampaigns, getCampaignsByPromoter } = useCampaign();
    const params = useParams();

    useEffect(() => {
        getSubject(params.id);
        getCampaignsByPromoter(params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto mb-10 px-4 sm:px-10 xl:px-40 flex flex-col">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                {subject?.picture?.secure_url ? (
                    <img
                        className="size-48 mr-2 rounded-full object-cover border-4 border-teal-600 self-center md:justify-self-start"
                        src={subject?.picture.secure_url}
                        alt="picture"
                    />
                ) : (
                    <img
                        className="size-48 mr-2 rounded-full object-cover border-4 border-teal-600 self-center md:justify-self-start"
                        src="/assets/user/avatar.jpg"
                        alt="picture"
                    />
                )}
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                        <h4 className="text-teal-800 mb-2 text-3xl font-semibold text-center md:text-left">
                            {subject?.name} {subject?.surname}
                        </h4>
                        {subject?.bio ? (
                            <p className="mb-2 md:mb-0">{subject?.bio}</p>
                        ) : (
                            <p className="mb-2 md:mb-0 text-gray-500 italic">
                                No hay biografía
                            </p>
                        )}
                    </div>
                    <div className="flex">
                        <p className="text-lg">
                            <strong className="mr-2">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </strong>
                            {subject?.email}
                        </p>
                        <p className="ml-8 md:text-lg">
                            <strong className="mr-2">
                                <FontAwesomeIcon icon={faPhone} />
                            </strong>
                            {subject?.phone ? (
                                subject?.phone
                            ) : (
                                <span className="text-gray-500 italic">
                                    No hay teléfono
                                </span>
                            )}{" "}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full h-0.5 bg-teal-600 my-4 md:my-6"></div>

            <div className="space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex flex-col space-y-4">
                    <h4 className="text-teal-800 text-2xl font-semibold">
                        Campañas de {subject?.name} {subject?.surname}
                    </h4>
                    <div className="grid grid-cols-1 gap-x-2 md:grid-cols-2 lg:grid-cols-3">
                        {promoterCampaigns.length === 0 ? (
                            <p className="text-gray-500 italic">
                                No hay campañas
                            </p>
                        ) : (
                            promoterCampaigns.map((campaign) => (
                                <CampaignStateCard
                                    key={campaign._id}
                                    campaign={campaign}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtherProfilePage;
