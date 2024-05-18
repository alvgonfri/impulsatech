import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTimeDonation } from "../../context/TimeDonationContext";
import TimeDonationAndRecords from "../../components/TimeDonationAndRecords";
import Alert from "../../components/Alert";

function TimeRecordPage() {
    const { subject } = useAuth();
    const { timeToInvest, getTimeToInvestByCollaborator } = useTimeDonation();
    const searchParams = new URLSearchParams(location.search);
    const created = searchParams.get("created");

    useEffect(() => {
        getTimeToInvestByCollaborator(subject?._id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto mb-10 px-10 xl:px-40">
            {created === "true" && (
                <Alert text="!Registro de tiempo publicado con éxito!" />
            )}

            <h2 className="text-3xl font-bold text-teal-800 mb-4">
                Registro de tiempo
            </h2>

            <p>
                Desde el registro de tiempo puedes ver toda la información
                relacionada con el tiempo que has donado a campañas que han sido
                completadas. Además, puedes indicar las horas que has invertido
                en cada campaña hasta que cumplas con el tiempo acordado.
            </p>

            <div className="mt-4">
                {timeToInvest.length === 0 ? (
                    <div className="text-center text-gray-500 italic">
                        No has donado tiempo a ninguna campaña que haya sido
                        completada
                    </div>
                ) : (
                    timeToInvest.map((donation) => (
                        <TimeDonationAndRecords
                            key={donation._id}
                            donation={donation}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default TimeRecordPage;
