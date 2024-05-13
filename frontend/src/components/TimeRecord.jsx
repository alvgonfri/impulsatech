import PropTypes from "prop-types";

function TimeRecord({ record }) {
    return (
        <div className="px-3 bg-white border border-gray-300 rounded-md mb-1 items-center">
            <div className="flex justify-between">
                <div className="text-indigo-600 font-semibold text-center min-w-11 py-1 pr-2">
                    {record.amount} h
                </div>
                <div className="font-semibold text-center min-w-28 py-1 px-2">
                    {record.date.split("T")[0]}
                </div>
            </div>

            <div className="py-1 px-2 border-t border-gray-300">
                {record.description}
            </div>
        </div>
    );
}

TimeRecord.propTypes = {
    record: PropTypes.object.isRequired,
};

export default TimeRecord;
