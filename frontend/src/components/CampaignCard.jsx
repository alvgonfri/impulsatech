import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function CampaignCard({ campaign }) {
    return (
        <a
            href={`/campaigns/${campaign._id}`}
            className="block w-80 mx-auto max-w-sm sm:w-full rounded-lg p-4 shadow bg-teal-50 border border-teal-200 hover:bg-teal-100"
        >
            {campaign.image ? (
                <img
                    alt="Campaign"
                    src={campaign.image && campaign.image.secure_url}
                    className="h-56 w-full rounded-md object-cover"
                />
            ) : (
                <img
                    alt="Campaign"
                    src="assets/campaign/no_image.png"
                    className="h-56 w-full rounded-md object-cover"
                />
            )}

            <div className="mt-2">
                <div className="mt-2 text-lg font-medium truncate">
                    {campaign.title}
                </div>

                {campaign.status !== "cancelled" &&
                    (campaign.financialGoal ? (
                        <div className="mt-2 flex justify-between items-center gap-2">
                            <div className="text-lg text-teal-500 font-medium">
                                {campaign.financialGoal}&nbsp;€
                            </div>
                            <div className="h-5 w-full bg-neutral-200 rounded-full">
                                <div
                                    className="h-5 bg-teal-500 p-0.5 text-center text-xs font-medium leading-none text-white rounded-full"
                                    style={{
                                        width: `${campaign.moneyDonatedPercetage}%`,
                                    }}
                                >
                                    {campaign.moneyDonatedPercetage}%
                                </div>
                            </div>
                            <FontAwesomeIcon
                                icon={faCoins}
                                className="text-teal-500"
                            />
                        </div>
                    ) : (
                        <div className="mt-2 flex justify-between items-center gap-2">
                            <div className="h-5 w-full bg-neutral-200 rounded-full">
                                <div
                                    className="h-5 bg-gray-400 p-0.5 text-center text-xs font-medium leading-none text-white rounded-full"
                                    style={{ width: "100%" }}
                                >
                                    Sin objetivo económico
                                </div>
                            </div>
                            <FontAwesomeIcon
                                icon={faCoins}
                                className="text-gray-400"
                            />
                        </div>
                    ))}

                {campaign.status !== "cancelled" &&
                    (campaign.timeGoal ? (
                        <div className="mt-2 flex justify-between items-center gap-2">
                            <div className="text-lg text-indigo-500 font-medium">
                                {campaign.timeGoal}&nbsp;h
                            </div>

                            <div className="h-5 w-full bg-neutral-200 rounded-full">
                                <div
                                    className="h-5 bg-indigo-500 p-0.5 text-center text-xs font-medium leading-none text-white rounded-full"
                                    style={{
                                        width: `${campaign.timeDonatedPercentage}%`,
                                    }}
                                >
                                    {campaign.timeDonatedPercentage}%
                                </div>
                            </div>
                            <FontAwesomeIcon
                                icon={faClock}
                                className="text-indigo-500"
                            />
                        </div>
                    ) : (
                        <div className="mt-2 flex justify-between items-center gap-2">
                            <div className="h-5 w-full bg-neutral-200 rounded-full">
                                <div
                                    className="h-5 bg-gray-400 p-0.5 text-center text-xs font-medium leading-none text-white rounded-full"
                                    style={{ width: "100%" }}
                                >
                                    Sin objetivo de tiempo
                                </div>
                            </div>
                            <FontAwesomeIcon
                                icon={faClock}
                                className="text-gray-400"
                            />
                        </div>
                    ))}
            </div>
        </a>
    );
}

CampaignCard.propTypes = {
    campaign: PropTypes.object.isRequired,
};

export default CampaignCard;
