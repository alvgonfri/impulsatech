import PropTypes from "prop-types";
import TimeRecord from "./TimeRecord";

function TimeDonationAndRecords({ donation }) {
    return (
        <div className="block rounded-lg py-1 px-3 mb-2 shadow bg-gray-100 border border-teal-200">
            <div className="flex mb-1">
                <p className="font-semibold mr-1">Campaña:</p>
                <p>{donation.campaign.title}</p>
            </div>
            <div className="lg:flex">
                <div className="flex lg:w-2/5 mb-1">
                    <p className="font-semibold mr-1">Periodo:</p>
                    <p className="text-indigo-600">
                        {donation.period.startDate.split("T")[0]} -{" "}
                        {donation.period.endDate.split("T")[0]}
                    </p>
                </div>

                <div className="md:flex md:justify-between lg:w-3/5">
                    <div className="flex lg:w-1/3 mb-1">
                        <p className="font-semibold mr-1">Horas donadas:</p>
                        <p className="text-indigo-600 font-semibold">
                            {donation.amount}
                        </p>
                    </div>

                    <div className="flex lg:w-1/3 mb-1">
                        <p className="font-semibold mr-1">Horas invertidas:</p>
                        <p className="text-indigo-400 font-semibold">
                            {donation.timeRecords.reduce(
                                (acc, record) => acc + record.amount,
                                0
                            )}
                        </p>
                    </div>

                    <div className="flex lg:w-1/3 mb-1">
                        <p className="font-semibold mr-1">Horas restantes:</p>
                        <p className="text-indigo-800 font-semibold">
                            {donation.amount -
                                donation.timeRecords.reduce(
                                    (acc, record) => acc + record.amount,
                                    0
                                )}
                        </p>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-300 my-2"></div>
            <div className="text-center">
                <p className="font-semibold">Registros de tiempo</p>
            </div>
            {donation.timeRecords.length > 0 ? (
                <div className="mt-2">
                    {donation.timeRecords.map((record) => (
                        <TimeRecord key={record._id} record={record} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center italic">
                    No hay registros de tiempo
                </p>
            )}
        </div>
    );
}

TimeDonationAndRecords.propTypes = {
    donation: PropTypes.object.isRequired,
};

export default TimeDonationAndRecords;
