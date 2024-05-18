import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Alert({ text }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div className="bg-teal-50 shadow-md p-4 mb-2 border flex justify-between rounded-lg">
            <div className="flex">
                <div className="bg-teal-600 inline-block rounded-lg p-1 mr-1"></div>
                <b className="p-1">{text}</b>
            </div>

            <button
                className="flex items-center text-xl text-teal-800"
                onClick={() => setShow(false)}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
}

Alert.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Alert;
