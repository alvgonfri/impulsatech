import { useEffect, useState, useRef } from "react";
import { useCampaign } from "../../context/CampaignContext";
import { useFinancialDonation } from "../../context/FinancialDonationContext";
import { useTimeDonation } from "../../context/TimeDonationContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../../components/Tooltip";
import Tag from "../../components/Tag";

function CampaignPage() {
    const [campaign, setCampaign] = useState({});
    const [promoter, setPromoter] = useState({});
    const [invalidAmount, setInvalidAmount] = useState(false);
    const { getCampaign } = useCampaign();
    const { processPayment, errors: financialDonationErrors } =
        useFinancialDonation();
    const { createTimeDonation, errors: timeDonationErrors } =
        useTimeDonation();
    const { isAuthenticated } = useAuth();
    const financialDonationRef = useRef();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadCampaign() {
            if (params.id) {
                const campaign = await getCampaign(params.id);

                if (campaign.timeGoalPeriod) {
                    campaign.timeGoalPeriod.startDate = new Date(
                        campaign.timeGoalPeriod.startDate
                    ).toLocaleDateString();
                    campaign.timeGoalPeriod.endDate = new Date(
                        campaign.timeGoalPeriod.endDate
                    ).toLocaleDateString();
                }

                if (campaign.deadline) {
                    campaign.deadline = new Date(
                        campaign.deadline
                    ).toLocaleDateString();
                }

                setCampaign(campaign);
                setPromoter(campaign.promoter);
            }
        }

        loadCampaign();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmitFinancialDonation = async (e) => {
        e.preventDefault();

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

        const amount = financialDonationRef.current.amount.value;
        const anonymous = isAuthenticated
            ? financialDonationRef.current.anonymous.checked
            : true;
        const campaignId = campaign._id;

        if (!amount) {
            setInvalidAmount(true);
            return;
        }

        const financialDonation = {
            amount,
            anonymous,
            campaignId,
        };

        const response = await processPayment(financialDonation);

        const session = await stripe.redirectToCheckout({
            sessionId: response.sessionId,
        });

        if (session.error) {
            console.error(session.error.message);
        }

        setInvalidAmount(false);
    };

    const onSubmitTimeDonation = handleSubmit(async (data) => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        const period = {
            startDate: data.startDate,
            endDate: data.endDate,
        };

        const timeDonation = {
            amount: data.timeDonated,
            period,
            campaignId: campaign._id,
        };

        const status = await createTimeDonation(timeDonation);

        if (status === 201) {
            window.location.reload();
        }
    });

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

                    <div className="flex gap-2 mb-4">
                        {campaign.tags &&
                            campaign.tags.map((tag, i) => (
                                <Tag key={i} text={tag} />
                            ))}
                    </div>

                    <p className="mb-4">{campaign.description}</p>

                    <div className="mb-2 flex gap-2 items-center">
                        <p className="text-teal-600 text-lg font-bold">
                            Compartir
                        </p>
                        <Tooltip
                            text="Para poder compartir por correo electrónico,
                                debes tener configurado un cliente de correo
                                electrónico por defecto en tu sistema"
                        />
                    </div>
                    <div className="mt-2 sharethis-inline-share-buttons"></div>
                </div>
                <div className="w-full h-fit md:w-2/5 rounded-md border-2 border-teal-600">
                    <div className="flex bg-teal-600 text-white px-4 py-2">
                        <p className="font-bold">Promotor:</p>
                        <span className="ml-2">{promoter.name}</span>
                    </div>

                    {campaign.financialGoal && (
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
                    )}

                    {campaign.timeGoal && (
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
                                    icon={faClock}
                                    className="text-indigo-500"
                                />
                            </div>
                        </>
                    )}

                    <div className="px-4 py-2 mt-2">
                        {campaign.status === "ongoing" && (
                            <span className="bg-amber-500 text-white px-2 py-1 rounded">
                                Campaña en curso
                            </span>
                        )}
                        {campaign.status === "completed" && (
                            <span className="bg-green-800 text-white px-2 py-1 rounded">
                                Campaña completada
                            </span>
                        )}
                        {campaign.status === "cancelled" && (
                            <span className="bg-red-800 text-white px-2 py-1 rounded">
                                Campaña cancelada
                            </span>
                        )}
                    </div>

                    {campaign.timeGoal && (
                        <>
                            <div className="px-4 py-2">
                                <p className="block text-sm text-gray-700">
                                    Periodo de recibimiento tiempo:
                                </p>
                                <span>
                                    {campaign.timeGoalPeriod?.startDate} -{" "}
                                    {campaign.timeGoalPeriod?.endDate}
                                </span>
                            </div>
                        </>
                    )}

                    {campaign.deadline && (
                        <div className="px-4 py-2">
                            <p className="block text-sm text-gray-700">
                                Fecha límite:
                            </p>
                            <span>{campaign.deadline}</span>
                        </div>
                    )}

                    {campaign.financialGoal && (
                        <form
                            ref={financialDonationRef}
                            onSubmit={onSubmitFinancialDonation}
                            className="border-t-2 border-teal-600 px-4 py-2"
                        >
                            <div className="mb-4">
                                <p className="block text-gray-700 font-bold mb-1">
                                    Realizar donación económica
                                </p>

                                {financialDonationErrors.map((error, i) => (
                                    <div
                                        className="bg-red-500 text-white text-sm p-2 rounded-lg my-2"
                                        key={i}
                                    >
                                        {error}
                                    </div>
                                ))}

                                <label className="block text-sm text-gray-700">
                                    Cantidad a donar (€)
                                </label>
                                {invalidAmount && (
                                    <p className="text-red-500 text-sm mb-1">
                                        Por favor, ingresa una cantidad
                                    </p>
                                )}
                                <input
                                    type="number"
                                    name="amount"
                                    className="w-full px-4 py-2 rounded-md border border-teal-500"
                                    onChange={() => setInvalidAmount(false)}
                                />

                                {isAuthenticated && (
                                    <div className="mb-4 mt-2">
                                        <label className="flex items-center cursor-pointer">
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
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Enviar donación
                            </button>
                        </form>
                    )}

                    {campaign.timeGoal && (
                        <form
                            onSubmit={onSubmitTimeDonation}
                            className="border-t-2 border-teal-600 px-4 py-2"
                        >
                            <div className="mb-4">
                                <div className="flex gap-2 items-center">
                                    <p className="block text-gray-700 font-bold mb-1">
                                        Realizar donación de tiempo
                                    </p>
                                    <Tooltip text="Debes autenticarte para poder realizar una donación de tiempo" />
                                </div>

                                {timeDonationErrors.map((error, i) => (
                                    <div
                                        className="bg-red-500 text-white text-sm p-2 rounded-lg my-2"
                                        key={i}
                                    >
                                        {error}
                                    </div>
                                ))}

                                <label className="block text-sm text-gray-700">
                                    Cantidad a donar (horas)
                                </label>
                                {errors.timeDonated && (
                                    <p className="text-red-500 text-sm mb-1">
                                        Por favor, ingresa una cantidad
                                    </p>
                                )}
                                <input
                                    type="number"
                                    {...register("timeDonated", {
                                        required: true,
                                    })}
                                    className="w-full px-4 py-2 rounded-md border border-indigo-500"
                                />

                                <label className="block text-sm text-gray-700 mt-2">
                                    Periodo de disponibilidad
                                </label>
                                {errors.startDate || errors.endDate ? (
                                    <p className="text-red-500 text-sm mb-1">
                                        Por favor, selecciona un periodo de
                                        tiempo
                                    </p>
                                ) : null}
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-700 mr-2">
                                        Desde
                                    </p>
                                    <input
                                        type="date"
                                        {...register("startDate", {
                                            required: true,
                                        })}
                                        className="w-full px-4 py-2 rounded-md border border-indigo-500"
                                    />

                                    <p className="text-sm text-gray-700 mx-2">
                                        hasta
                                    </p>
                                    <input
                                        type="date"
                                        {...register("endDate", {
                                            required: true,
                                        })}
                                        className="w-full px-4 py-2 rounded-md border border-indigo-500"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Enviar donación
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CampaignPage;
