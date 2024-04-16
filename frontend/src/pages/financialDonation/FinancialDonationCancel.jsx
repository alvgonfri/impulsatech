import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function FinancialDonationCancel() {
    return (
        <div className="h-screen">
            <div className="bg-white p-6 md:mx-auto">
                <div className="text-center mb-6 text-">
                    <FontAwesomeIcon
                        className="text-7xl text-red-500"
                        icon={faCircleXmark}
                    />
                </div>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        ¡Donación cancelada!
                    </h3>
                    <p className="text-gray-600 my-2">
                        ¡Tu donación no se ha podido procesar!
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

export default FinancialDonationCancel;
