import PropTypes from "prop-types";

function Tag({ text }) {
    return (
        <div className="text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-teal-600 text-white rounded-full">
            {text}
        </div>
    );
}

Tag.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Tag;
