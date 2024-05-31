import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCoins,
    faClock,
    faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import {
    getCampaignStatsRequest,
    getTagRankingRequest,
    getFinancialStatsRequest,
    getTimeStatsRequest,
} from "../../api/stats.js";

function StatsPage() {
    const [campaignStats, setCampaignStats] = useState({});
    const [tagRanking, setTagRanking] = useState([]);
    const [financialStats, setFinancialStats] = useState({});
    const [timeStats, setTimeStats] = useState({});
    const { subject } = useAuth();
    const navigate = useNavigate();

    const tags = Object.keys(tagRanking);
    const formattedFiancialAverage = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
    }).format(financialStats.averageTotalAmount);
    const formattedTimeAverage = new Intl.NumberFormat("es-ES", {
        style: "unit",
        unit: "hour",
        maximumFractionDigits: 2,
    }).format(timeStats.averageTotalAmount);

    useEffect(() => {
        if (!subject.isAdmin) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            const campaignStats = await getCampaignStatsRequest();
            setCampaignStats(campaignStats.data);
            const tagRanking = await getTagRankingRequest();
            setTagRanking(tagRanking.data);
            const financialStats = await getFinancialStatsRequest();
            setFinancialStats(financialStats.data);
            const timeStats = await getTimeStatsRequest();
            setTimeStats(timeStats.data);
        };
        fetchStats();
    }, []);

    return (
        <div className="container mx-auto mb-10 px-4 sm:px-10 xl:px-40">
            <h1 className="text-3xl font-bold text-teal-800">
                Informe analítico
            </h1>
            <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl border-b-2">
                <div className="grid grid-cols-2 row-gap-8 md:grid-cols-4">
                    <div className="text-center md:border-r-2">
                        <h6 className="text-4xl font-bold text-teal-800 lg:text-5xl xl:text-6xl">
                            {campaignStats.ongoing +
                                campaignStats.completed +
                                campaignStats.cancelled}
                        </h6>
                        <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                            Campañas
                        </p>
                    </div>
                    <div className="text-center md:border-r-2">
                        <h6 className="text-4xl font-bold text-teal-800 lg:text-5xl xl:text-6xl">
                            {campaignStats.ongoing}
                        </h6>
                        <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                            En curso
                        </p>
                    </div>
                    <div className="text-center md:border-r-2">
                        <h6 className="text-4xl font-bold text-teal-800 lg:text-5xl xl:text-6xl">
                            {campaignStats.completed}
                        </h6>
                        <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                            Completadas
                        </p>
                    </div>
                    <div className="text-center">
                        <h6 className="text-4xl font-bold text-teal-800 lg:text-5xl xl:text-6xl">
                            {campaignStats.cancelled}
                        </h6>
                        <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                            Canceladas
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-10">
                <div className="bg-white border rounded-md overflow-hidden lg:w-1/5">
                    <div className="bg-gray-200 py-2 px-4 text-center">
                        <h2 className="text-xl font-semibold text-teal-800">
                            Etiquetas más usadas
                        </h2>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        <li className="flex items-center py-2 px-6">
                            <span className="text-teal-700 font-medium mr-4">
                                1.
                            </span>
                            <p className="font-medium text-gray-800">
                                {tags[0]}
                            </p>
                        </li>
                        <li className="flex items-center py-2 px-6">
                            <span className="text-teal-700 font-medium mr-4">
                                2.
                            </span>
                            <p className="font-medium text-gray-800">
                                {tags[1]}
                            </p>
                        </li>
                        <li className="flex items-center py-2 px-6">
                            <span className="text-teal-700 font-medium mr-4">
                                3.
                            </span>
                            <p className="font-medium text-gray-800">
                                {tags[2]}
                            </p>
                        </li>
                        <li className="flex items-center py-2 px-6">
                            <span className="text-teal-700 font-medium mr-4">
                                4.
                            </span>
                            <p className="font-medium text-gray-800">
                                {tags[3]}
                            </p>
                        </li>
                        <li className="flex items-center py-2 px-6">
                            <span className="text-teal-700 font-medium mr-4">
                                5.
                            </span>
                            <p className="font-medium text-gray-800">
                                {tags[4]}
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="bg-white border border-teal-500 rounded-md overflow-hidden lg:w-2/5">
                    <div className="bg-teal-500 py-2 px-4 text-center">
                        <h2 className="text-xl font-semibold text-white">
                            Donaciones económicas{" "}
                        </h2>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mx-16 py-6 border-b-2">
                            <div className="flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 mr-5 rounded-full bg-teal-500">
                                <FontAwesomeIcon
                                    icon={faCoins}
                                    className="text-white text-3xl xl:text-4xl"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl lg:text-3xl font-semibold text-right text-gray-400">
                                    {financialStats.totalDonated} €
                                </h3>
                                <p className="text-sm text-right text-teal-500 mt-2 ">
                                    Total donado
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mx-16 py-6">
                            <div className="flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 mr-5 rounded-full bg-teal-500">
                                <FontAwesomeIcon
                                    icon={faChartSimple}
                                    className="text-white text-3xl xl:text-4xl"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl lg:text-3xl font-semibold text-right text-gray-400">
                                    {formattedFiancialAverage}
                                </h3>
                                <p className="text-sm text-right text-teal-500 mt-2 ">
                                    Media por campaña
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-indigo-500 rounded-md overflow-hidden lg:w-2/5">
                    <div className="bg-indigo-500 py-2 px-4 text-center">
                        <h2 className="text-xl font-semibold text-white">
                            Donaciones de tiempo
                        </h2>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mx-16 py-6 border-b-2">
                            <div className="flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 mr-5 rounded-full bg-indigo-500">
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className="text-white text-3xl xl:text-4xl"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl lg:text-3xl font-semibold text-right text-gray-400">
                                    {timeStats.totalDonated} h
                                </h3>
                                <p className="text-sm text-right text-indigo-500 mt-2 ">
                                    Total donado
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mx-16 py-6">
                            <div className="flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 mr-5 rounded-full bg-indigo-500">
                                <FontAwesomeIcon
                                    icon={faChartSimple}
                                    className="text-white text-3xl xl:text-4xl"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl lg:text-3xl font-semibold text-right text-gray-400">
                                    {formattedTimeAverage}
                                </h3>
                                <p className="text-sm text-right text-indigo-500 mt-2 ">
                                    Media por campaña
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsPage;
