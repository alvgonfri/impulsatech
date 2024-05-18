import PropTypes from "prop-types";

function ReinvestmentCard({ reinvestment }) {
    return (
        <div className="block w-80 mx-auto max-w-sm sm:w-full rounded-lg py-1 px-3 mb-2 shadow bg-gray-100 border border-teal-200">
            <div className="flex justify-between">
                <p className="text-teal-500 font-bold w-1/3">
                    {reinvestment.amount} €
                </p>

                <div className="text-gray-500">
                    Fecha original: {reinvestment.updatedAt.split("T")[0]}
                </div>
            </div>
        </div>
    );
}

ReinvestmentCard.propTypes = {
    reinvestment: PropTypes.object.isRequired,
};

export default ReinvestmentCard;
