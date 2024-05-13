import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faBell } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useCampaign } from "../../context/CampaignContext";
import { useSubject } from "../../context/SubjectContext";
import { useFinancialDonation } from "../../context/FinancialDonationContext";
import CampaignStateCard from "../../components/CampaignStateCard";
import DonationCard from "../../components/DonationCard";
import ReinvestmentCard from "../../components/ReinvestmentCard";
import Tooltip from "../../components/Tooltip";

function ProfilePage() {
    const { subject } = useAuth();
    const {
        promoterCampaigns,
        getCampaignsByPromoter,
        interestingCampaigns,
        getInterestingCampaigns,
    } = useCampaign();
    const { subjectDonations, getDonationsBySubject } = useSubject();
    const { collaboratorReinvestments, getReinvestmentsByCollaborator } =
        useFinancialDonation();

    useEffect(() => {
        getCampaignsByPromoter(subject?._id);
        getDonationsBySubject(subject?._id);
        getReinvestmentsByCollaborator(subject?._id);
        getInterestingCampaigns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto mb-10 px-4 sm:px-10 xl:px-40 flex flex-col">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                {subject?.picture.secure_url ? (
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
                        <p className="md:text-lg">
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

            <div className="flex flex-col gap-x-2 space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                <div className="flex flex-col space-y-4 md:w-1/3">
                    <h4 className="text-teal-800 text-2xl font-semibold">
                        Mis campañas
                    </h4>
                    <div>
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

                <div className="flex flex-col space-y-4 md:w-1/3">
                    <h4 className="text-teal-800 text-2xl font-semibold">
                        Mis donaciones
                    </h4>
                    <div>
                        {subjectDonations.length === 0 ? (
                            <p className="text-gray-500 italic">
                                No hay donaciones
                            </p>
                        ) : (
                            subjectDonations.map((donation) => (
                                <DonationCard
                                    key={donation._id}
                                    donation={donation}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className="flex flex-col space-y-4 md:w-1/3">
                    <h4 className="text-teal-800 text-2xl font-semibold">
                        Mis reinversiones{" "}
                        <Tooltip text="Si una campaña en curso a la que has donado dinero es cancelada o eliminada, podrás reinvertir el dinero donado en otra campaña." />
                    </h4>
                    <div>
                        {collaboratorReinvestments.length === 0 ? (
                            <p className="text-gray-500 italic">
                                No hay reinversiones
                            </p>
                        ) : (
                            <>
                                <div className="flex items-center justify-center font-bold mb-2">
                                    Reinversiones pendientes{" "}
                                    <div className="bg-red-500 text-white font-normal px-2 rounded-md ml-2">
                                        {collaboratorReinvestments.length}{" "}
                                        <FontAwesomeIcon icon={faBell} />
                                    </div>
                                </div>
                                {collaboratorReinvestments.map(
                                    (reinvestment) => (
                                        <ReinvestmentCard
                                            key={reinvestment._id}
                                            reinvestment={reinvestment}
                                        />
                                    )
                                )}
                                <p className="text-center font-bold mt-3 mb-2">
                                    Campañas que podrían interesarte
                                </p>
                                {interestingCampaigns.map((campaign) => (
                                    <CampaignStateCard
                                        key={campaign._id}
                                        campaign={campaign}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
