import PropTypes from "prop-types";

function ReceivedDonationCard({ donation }) {
    return (
        <div className="block mx-auto w-full rounded-lg py-1 px-3 mb-2 shadow bg-gray-100 border border-teal-200">
            {donation.period ? (
                <>
                    <div className="flex justify-between">
                        <p className="text-indigo-500 font-bold w-1/3">
                            {donation.amount} h
                        </p>
                        <a
                            className="text-indigo-500 hover:underline"
                            href={`/profile/${donation.collaborator.id}`}
                        >
                            {donation.collaboratorName}
                        </a>
                    </div>
                    <div className="flex justify-between">
                        {donation.campaign.status === "completed" && (
                            <div className="flex">
                                <p className="mr-1">Horas invertidas:</p>
                                <p className="text-indigo-400 font-semibold">
                                    {donation.timeRecords.reduce(
                                        (acc, record) => acc + record.amount,
                                        0
                                    )}
                                </p>
                            </div>
                        )}
                        <p className="text-indigo-500">
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
                    <div className="flex justify-between">
                        <p className="text-teal-500 font-bold w-1/3">
                            {donation.amount} €
                        </p>
                        <p className="text-teal-500 text-right w-2/3">
                            {donation.anonymous ? (
                                "Anónima"
                            ) : (
                                <a
                                    className="hover:underline"
                                    href={`/profile/${donation.collaborator.id}`}
                                >
                                    {donation.collaboratorName}
                                </a>
                            )}
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

ReceivedDonationCard.propTypes = {
    donation: PropTypes.object.isRequired,
};

export default ReceivedDonationCard;
