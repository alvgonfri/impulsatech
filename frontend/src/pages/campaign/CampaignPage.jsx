import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCampaign } from "../../context/CampaignContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function CampaignPage() {
    const [campaign, setCampaign] = useState({});
    const { getCampaign } = useCampaign();
    const params = useParams();

    useEffect(() => {
        async function loadCampaign() {
            if (params.id) {
                const campaign = await getCampaign(params.id);
                setCampaign(campaign);
            }
        }
        loadCampaign();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto px-20">
            <h1 className="text-3xl font-bold text-teal-800 mb-4">
                {campaign.title}
            </h1>
            <p className="mb-4">{campaign.description}</p>
            <div className="mb-4 flex">
                <p>Estado:</p>
                {campaign.status === "ongoing" && (
                    <span className="text-teal-800 ml-2">En curso</span>
                )}
                {campaign.status === "completed" && (
                    <span className="text-green-800 ml-2">Completada</span>
                )}
                {campaign.status === "cancelled" && (
                    <span className="text-red-800 ml-2">Cancelada</span>
                )}
            </div>
            {campaign.timeGoal && (
                <div className="mb-4 flex">
                    <p>Objetivo de tiempo:</p>
                    <span className="ml-2">{campaign.timeGoal} horas</span>
                </div>
            )}
            {campaign.financialGoal && (
                <div className="mb-4 flex">
                    <p>Objetivo financiero:</p>
                    <span className="ml-2">{campaign.financialGoal} €</span>
                </div>
            )}
            {campaign.deadline && (
                <div className="mb-4 flex">
                    <p>Fecha límite:</p>
                    <span className="ml-2">{campaign.deadline}</span>
                </div>
            )}
            <div className="mb-4 flex gap-2">
                <div>Compartir</div>
                <div className="has-tooltip inline-block">
                    <span className="tooltip rounded bg-teal-700 text-white text-xs p-2 -mt-9">
                        Para poder compartir por correo electrónico, debes tener
                        configurado un cliente de correo electrónico por defecto
                        en tu sistema.
                    </span>
                    <p className="bg-teal-700 text-white text-sm mx-auto cursor-pointer rounded-2xl px-2 py-1">
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </p>
                </div>
            </div>
            <div className="mt-2 sharethis-inline-share-buttons"></div>
        </div>
    );
}

export default CampaignPage;
