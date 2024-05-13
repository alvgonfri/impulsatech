import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faCaretDown,
    faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { useTimeDonation } from "../context/TimeDonationContext";
import TimeRecord from "./TimeRecord";

function TimeDonationAndRecords({ donation }) {
    const [showTimeRecords, setShowTimeRecords] = useState(false);
    const [showTimeRecordForm, setShowTimeRecordForm] = useState(false);
    const { createTimeRecord, timeRecordErrors } = useTimeDonation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        const status = await createTimeRecord({
            ...data,
            timeDonationId: donation._id,
        });

        if (status === 201) {
            setShowTimeRecordForm(false);
            window.location.href = "/time-record?created=true";
        }
    });

    return (
        <div
            className="block rounded-lg py-1 px-3 mb-2 shadow border border-teal-200"
            style={{
                backgroundColor:
                    donation.timeRecords.reduce(
                        (acc, record) => acc + record.amount,
                        0
                    ) >= donation.amount
                        ? "#f0fdfa"
                        : "#f3f4f6",
            }}
        >
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
                        <p className="font-semibold mr-1">Horas pendientes:</p>
                        <p className="text-indigo-800 font-semibold">
                            {donation.amount -
                                donation.timeRecords.reduce(
                                    (acc, record) => acc + record.amount,
                                    0
                                ) <
                            0
                                ? 0
                                : donation.amount -
                                  donation.timeRecords.reduce(
                                      (acc, record) => acc + record.amount,
                                      0
                                  )}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-300 my-2"></div>

            {showTimeRecords && (
                <>
                    <div className="flex gap-x-4 justify-center items-center">
                        <p className="font-semibold">Registros de tiempo</p>
                        <button
                            onClick={() =>
                                setShowTimeRecordForm(!showTimeRecordForm)
                            }
                            className="bg-indigo-600 hover:bg-indigo-700 rounded-md text-white border border-white px-2 py-1 transition duration-500"
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                        </button>
                    </div>

                    {showTimeRecordForm && (
                        <div className="mt-2 py-2 border-y border-gray-300">
                            {timeRecordErrors.map((error, i) => (
                                <div
                                    className="bg-red-500 text-white text-sm p-2 rounded-lg my-2"
                                    key={i}
                                >
                                    {error}
                                </div>
                            ))}
                            <form
                                onSubmit={onSubmit}
                                className="lg:flex justify-between items-center gap-x-2"
                            >
                                <div className="mb-2 lg:mb-0 mr-2">
                                    <label
                                        htmlFor="amount"
                                        className="text-sm mr-1"
                                    >
                                        Horas
                                    </label>
                                    {errors.amount && (
                                        <p className="text-red-500 text-sm">
                                            Por favor, ingresa una cantidad
                                        </p>
                                    )}
                                    <input
                                        type="number"
                                        {...register("amount", {
                                            required: true,
                                        })}
                                        className="border border-gray-300 rounded-md p-1"
                                    />
                                </div>

                                <div className="mb-2 lg:mb-0 mr-2">
                                    <label
                                        htmlFor="date"
                                        className="text-sm mr-1"
                                    >
                                        Fecha
                                    </label>
                                    {errors.date && (
                                        <p className="text-red-500 text-sm">
                                            Por favor, ingresa una fecha
                                        </p>
                                    )}
                                    <input
                                        type="date"
                                        {...register("date", {
                                            required: true,
                                        })}
                                        className="border border-gray-300 rounded-md p-1"
                                    />
                                </div>

                                <div className="flex flex-grow items-center mb-2 lg:mb-0">
                                    <label
                                        htmlFor="description"
                                        className="text-sm mr-1"
                                    >
                                        Descripción
                                    </label>
                                    <textarea
                                        {...register("description")}
                                        className="border border-gray-300 rounded-md p-1 w-full"
                                        rows="1"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 rounded-md text-white border border-white px-2 py-1 transition duration-500"
                                >
                                    Publicar
                                </button>
                            </form>
                        </div>
                    )}

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
                </>
            )}
            <div className="flex justify-center mt-2">
                <button
                    onClick={() => setShowTimeRecords(!showTimeRecords)}
                    className="text-indigo-600"
                >
                    {showTimeRecords ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                    ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                    )}
                </button>
            </div>
        </div>
    );
}

TimeDonationAndRecords.propTypes = {
    donation: PropTypes.object.isRequired,
};

export default TimeDonationAndRecords;
