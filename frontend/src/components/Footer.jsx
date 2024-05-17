import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <footer className="bg-teal-900 text-white text-center px-8 xl:px-40 py-6">
            <div className="lg:flex lg:justify-between">
                <div>
                    <Link
                        to="/information"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Más información <FontAwesomeIcon icon={faLink} />
                    </Link>
                </div>
                <div>
                    <Link
                        to="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Política de Privacidad <FontAwesomeIcon icon={faLink} />
                    </Link>
                </div>
                <div>
                    <Link
                        to="/terms-of-use"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Términos de Uso <FontAwesomeIcon icon={faLink} />
                    </Link>
                </div>

                <p className="mt-4 lg:mt-0">
                    Contacta con nosotros a través de{" "}
                    <span className="font-bold">
                        impulsatech.info@gmail.com
                    </span>
                </p>
            </div>
            <div className="mt-8">&copy; 2024 ImpulsaTech</div>
        </footer>
    );
}

export default Footer;
