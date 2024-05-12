import PropTypes from "prop-types";

function DonationCard({ donation }) {
    return (
        <div className="block w-80 mx-auto max-w-sm sm:w-full rounded-lg py-1 px-3 mb-2 shadow bg-gray-100 border border-teal-200">
            {donation.period ? (
                <>
                    {donation.campaign !== null ? (
                        donation.campaign.status === "cancelled" ? (
                            <a
                                href={`/campaigns/${donation.campaign._id}`}
                                className="font-bold text-red-800 italic hover:underline"
                            >
                                Campaña cancelada
                            </a>
                        ) : (
                            <a
                                href={`/campaigns/${donation.campaign._id}`}
                                className="font-bold hover:underline"
                            >
                                {donation.campaign.title}
                            </a>
                        )
                    ) : (
                        <p className="font-bold text-red-800 italic">
                            Campaña eliminada
                        </p>
                    )}
                    <div className="flex justify-between">
                        <p className="text-indigo-500 font-bold w-1/3">
                            {donation.amount} h
                        </p>
                        <p className="text-indigo-500 text-right w-2/3">
                            {donation.period.startDate.split("T")[0]} -{" "}
                            {donation.period.endDate.split("T")[0]}
                        </p>
                    </div>
                    <div className="text-gray-500">
                        Reliazada: {donation.updatedAt.split("T")[0]}
                    </div>
                </>
            ) : (
                <>
                    {donation.campaign !== null ? (
                        donation.campaign.status === "cancelled" ? (
                            <a
                                href={`/campaigns/${donation.campaign._id}`}
                                className="font-bold text-red-800 italic hover:underline"
                            >
                                Campaña cancelada
                            </a>
                        ) : (
                            <a
                                href={`/campaigns/${donation.campaign._id}`}
                                className="font-bold hover:underline"
                            >
                                {donation.campaign.title}
                            </a>
                        )
                    ) : (
                        <p className="font-bold text-red-800 italic">
                            Campaña eliminada
                        </p>
                    )}
                    <div className="flex justify-between">
                        <p className="text-teal-500 font-bold w-1/3">
                            {donation.amount} €
                        </p>
                        <p className="text-teal-500 text-right w-2/3">
                            {donation.anonymous ? "Anónima" : "Pública"}
                        </p>
                    </div>
                    <div className="text-gray-500">
                        Reliazada: {donation.updatedAt.split("T")[0]}
                    </div>
                </>
            )}
        </div>
    );
}

DonationCard.propTypes = {
    donation: PropTypes.object.isRequired,
};

export default DonationCard;
