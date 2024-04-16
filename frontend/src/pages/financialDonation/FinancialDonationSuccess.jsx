import { useEffect } from "react";
import { useFinancialDonation } from "../../context/FinancialDonationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function FinancialDonationSuccess() {
    const { createFinancialDonation } = useFinancialDonation();

    useEffect(() => {
        async function createDonation() {
            await createFinancialDonation();
        }
        createDonation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-screen">
            <div className="bg-white p-6 md:mx-auto">
                <div className="text-center mb-6 text-">
                    <FontAwesomeIcon
                        className="text-7xl text-green-500"
                        icon={faCircleCheck}
                    />
                </div>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        ¡Donación realizada con éxito!
                    </h3>
                    <p className="text-gray-600 my-2">
                        ¡Gracias por tu contribución!
                    </p>
                    <div className="py-10 text-center">
                        <a
                            href="/campaigns"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Ver campañas
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinancialDonationSuccess;
