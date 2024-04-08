import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function CampaignCard({ campaign }) {
    return (
        <a
            href="#"
            className="block rounded-lg p-4 shadow bg-teal-50 hover:bg-teal-100"
        >
            <img
                alt=""
                src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-56 w-full rounded-md object-cover"
            />

            <div className="mt-2">
                <div className="text-sm text-gray-500">Tags</div>

                <div className="mt-2 text-lg font-medium truncate">
                    {campaign.title}
                </div>

                <div className="mt-2 flex justify-between gap-2">
                    <FontAwesomeIcon icon={faCoins} className="text-teal-600" />
                    <div className="h-5 w-full bg-neutral-200 rounded-full">
                        <div
                            className="h-5 bg-teal-600 p-0.5 text-center text-xs font-medium leading-none text-white rounded-full"
                            style={{ width: "60%" }}
                        >
                            60%
                        </div>
                    </div>
                </div>

                <div className="mt-2 flex justify-between gap-2">
                    <FontAwesomeIcon icon={faClock} className="text-teal-600" />
                    <div className="h-5 w-full bg-neutral-200 rounded-full">
                        <div
                            className="h-5 bg-teal-600 p-0.5 text-center text-xs font-medium leading-none text-white rounded-full"
                            style={{ width: "48%" }}
                        >
                            48%
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}

CampaignCard.propTypes = {
    campaign: PropTypes.object.isRequired,
};

export default CampaignCard;
