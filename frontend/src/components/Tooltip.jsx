import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function Tooltip({ text }) {
    return (
        <div className="group cursor-pointer relative inline-block text-center">
            <FontAwesomeIcon
                icon={faCircleInfo}
                className="text-teal-600 text-xl"
            />
            <div className="opacity-0 w-40 bg-teal-600 text-white text-center text-xs rounded-lg py-2 absolute group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
                {text}
            </div>
        </div>
    );
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Tooltip;
