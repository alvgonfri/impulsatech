import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCampaign } from "../../context/CampaignContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function CampaignPage() {
    const [campaign, setCampaign] = useState({});
    const [promoter, setPromoter] = useState({});
    const { getCampaign } = useCampaign();
    const params = useParams();

    console.log(campaign);

    useEffect(() => {
        async function loadCampaign() {
            if (params.id) {
                const campaign = await getCampaign(params.id);
                setCampaign(campaign);
                setPromoter(campaign.promoter);
            }
        }

        loadCampaign();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto px-10 md:px-40 mb-10">
            <h1 className="text-3xl font-bold text-teal-800 mb-4">
                {campaign.title}
            </h1>
            <div className="flex flex-col gap-8 md:flex-row">
                <div className="w-full md:w-3/5  mb-4 md:mb-0">
                    {campaign.image ? (
                        <img
                            alt="Campaign"
                            src={campaign.image && campaign.image.secure_url}
                            className="w-full h-96 rounded-md object-cover border-2 border-teal-600 mb-4"
                        />
                    ) : (
                        <img
                            alt="Campaign"
                            src="../assets/campaign/no_image.png"
                            className="w-full h-96 rounded-md object-cover border-2 border-teal-600 mb-4"
                        />
                    )}

                    <p className="mb-4">{campaign.description}</p>

                    <div className="mb-4 flex gap-2">
                        <div>Compartir</div>
                        <div className="has-tooltip inline-block">
                            <span className="tooltip rounded bg-teal-700 text-white text-xs p-2 -mt-9">
                                Para poder compartir por correo electrónico,
                                debes tener configurado un cliente de correo
                                electrónico por defecto en tu sistema.
                            </span>
                            <p className="bg-teal-700 text-white text-sm mx-auto cursor-pointer rounded-2xl px-2 py-1">
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </p>
                        </div>
                    </div>
                    <div className="mt-2 sharethis-inline-share-buttons"></div>
                </div>
                <div className="w-full md:w-2/5 rounded-md border-2 border-teal-600">
                    <div className="flex bg-teal-600 text-white px-4 py-2">
                        <p className="font-bold">Promotor:</p>
                        <span className="ml-2">{promoter.name}</span>
                    </div>

                    {campaign.financialGoal ? (
                        <>
                            <div className="text-lg text-teal-500 font-medium px-4 pt-2">
                                {campaign.moneyDonated} € de&nbsp;
                                {campaign.financialGoal} €
                            </div>
                            <div className="mt-2 flex justify-between items-center gap-2 px-4 pb-2">
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
                        </>
                    ) : (
                        <div className="mt-2 flex justify-between items-center gap-2 px-4 py-2">
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
                    )}

                    {campaign.timeGoal ? (
                        <>
                            <div className="text-lg text-indigo-500 font-medium px-4 pt-2">
                                {campaign.timeDonated} h de&nbsp;
                                {campaign.timeGoal} h
                            </div>
                            <div className="mt-2 flex justify-between items-center gap-2 px-4 pb-2">
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
                                    icon={faCoins}
                                    className="text-indigo-500"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="mt-2 flex justify-between items-center gap-2 px-4 py-2">
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
                    )}

                    <div className="flex px-4 py-2">
                        <p>Estado:</p>
                        {campaign.status === "ongoing" && (
                            <span className="text-teal-800 ml-2">En curso</span>
                        )}
                        {campaign.status === "completed" && (
                            <span className="text-green-800 ml-2">
                                Completada
                            </span>
                        )}
                        {campaign.status === "cancelled" && (
                            <span className="text-red-800 ml-2">Cancelada</span>
                        )}
                    </div>

                    {campaign.timeGoal && (
                        <div className="flex px-4 py-2">
                            <p>Objetivo de tiempo:</p>
                            <span className="ml-2">
                                {campaign.timeGoal} horas
                            </span>
                        </div>
                    )}

                    {campaign.deadline && (
                        <div className="flex px-4 py-2">
                            <p>Fecha límite:</p>
                            <span className="ml-2">{campaign.deadline}</span>
                        </div>
                    )}

                    <form
                        onSubmit={() => {
                            console.log("Donation submitted");
                        }}
                        className="border-t-2 border-teal-600 px-4 py-2"
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="donationAmount"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Realizar donación económica (€)
                            </label>
                            <input
                                type="number"
                                name="donationAmount"
                                placeholder="Introduce la cantidad a donar"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="anonymous"
                                className="flex items-center cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    name="anonymous"
                                    className="mr-2 leading-tight"
                                />
                                <span className="text-sm text-gray-700">
                                    Donación anónima
                                </span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Enviar donación
                        </button>
                    </form>

                    <form
                        onSubmit={() => {
                            console.log("Donation submitted");
                        }}
                        className="border-t-2 border-teal-600 px-4 py-2"
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="donationAmount"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Realizar donación de tiempo (h)
                            </label>
                            <input
                                type="number"
                                name="donationAmount"
                                placeholder="Introduce la cantidad a donar"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Enviar donación
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CampaignPage;
