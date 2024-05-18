import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function CampaignStateCard({ campaign }) {
    return (
        <a
            href={`/campaigns/${campaign._id}`}
            className="block w-80 mx-auto max-w-sm sm:w-full rounded-lg py-1 px-3 mb-2 shadow bg-gray-100 border border-teal-200 hover:bg-teal-100"
        >
            <div className="flex justify-between">
                <div className="flex items-center w-4/5">
                    <div className="text-sm p-2">
                        {campaign.status === "ongoing" && (
                            <span className="bg-amber-500 text-white px-2 py-1 rounded"></span>
                        )}
                        {campaign.status === "completed" && (
                            <span className="bg-green-800 text-white px-2 py-1 rounded"></span>
                        )}
                        {campaign.status === "cancelled" && (
                            <span className="bg-red-800 text-white px-2 py-1 rounded"></span>
                        )}
                    </div>
                    <div className="font-medium truncate">{campaign.title}</div>
                </div>
                <div className="flex gap-x-2 p-2">
                    {campaign.financialGoal && (
                        <FontAwesomeIcon
                            icon={faCoins}
                            className="text-teal-500"
                        />
                    )}
                    {campaign.timeGoal && (
                        <FontAwesomeIcon
                            icon={faClock}
                            className="text-indigo-500"
                        />
                    )}
                </div>
            </div>
        </a>
    );
}

CampaignStateCard.propTypes = {
    campaign: PropTypes.object.isRequired,
};

export default CampaignStateCard;
