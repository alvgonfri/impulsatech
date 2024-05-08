import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <footer className="bg-teal-900 text-white text-center px-8 xl:px-40 py-6">
            <div className="lg:flex lg:justify-between">
                <div>
                    <a>
                        Más información <FontAwesomeIcon icon={faLink} />
                    </a>
                </div>
                <div>
                    <a>
                        Política de privacidad <FontAwesomeIcon icon={faLink} />
                    </a>
                </div>
                <div>
                    <a>
                        Términos de uso <FontAwesomeIcon icon={faLink} />
                    </a>
                </div>
                <p className="mt-4 lg:mt-0">
                    Contacta con nosotros a través de{" "}
                    <span className="font-bold">impulsatech@gmail.com </span>
                </p>
            </div>
            <div className="mt-8">&copy; 2024 ImpulsaTech</div>
        </footer>
    );
}

export default Footer;
