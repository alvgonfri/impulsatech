import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { subject, isAuthenticated, logOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
    }, [location]);

    return (
        <nav className="bg-teal-600 text-white flex gap-x-5 px-10 py-3 mb-2 fixed top-0 left-0 right-0">
            <Link to="/">
                <img
                    src="/assets/impulsatech_logo.png"
                    alt="logo"
                    className="h-10 mr-3 hover:opacity-50 transition duration-500"
                />
            </Link>
            <div className="flex lg:hidden sm:flex-grow sm:justify-end">
                <button
                    className="bg-teal-700 hover:bg-teal-800 px-3 py-1 rounded-md border"
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>

            {isAuthenticated ? (
                <div
                    className={`bg-teal-600 lg:flex ${
                        isMenuOpen ? "block" : "hidden"
                    } lg:flex-grow items-center justify-between absolute lg:relative top-16 lg:top-0 w-full lg:w-auto left-0 py-2 lg:py-0 px-10 lg:px-0`}
                >
                    <div className="flex gap-x-5 flex-col lg:flex-row gap-y-2 lg:gap-y-0 mb-2 lg:mb-0">
                        <Link
                            to="/"
                            className="hover:opacity-65 transition duration-500"
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/campaigns"
                            className="hover:opacity-65 transition duration-500"
                        >
                            Campañas
                        </Link>
                    </div>

                    <div className="flex gap-x-5 items-start lg:items-stretch flex-col lg:flex-row gap-y-2 lg:gap-y-0">
                        <button
                            onClick={toggleDropdown}
                            className="bg-teal-700 hover:bg-teal-800 flex items-center rounded-md border border-white px-3 py-1 transition duration-500"
                        >
                            {subject.picture.secure_url ? (
                                <img
                                    className="size-8 mr-2 rounded-full object-cover border border-white"
                                    src={subject.picture.secure_url}
                                    alt="picture"
                                />
                            ) : (
                                <img
                                    className="size-8 mr-2 rounded-full object-cover border border-white"
                                    src="/assets/user/avatar.jpg"
                                    alt="picture"
                                />
                            )}
                            {subject.name}
                        </button>
                        <div
                            className={`${
                                isDropdownOpen ? "block" : "hidden"
                            } absolute top-24 lg:top-12 lg:right-0 bg-teal-600 p-3 rounded-md shadow-md  flex flex-col gap-y-2`}
                        >
                            <Link
                                to="/profile"
                                className="block p-1 rounded-md hover:bg-teal-700 transition duration-500"
                            >
                                Mi perfil
                            </Link>
                            <button
                                onClick={() => {
                                    logOut();
                                    navigate("/");
                                }}
                                className="bg-teal-700 hover:bg-teal-800 rounded-md border border-white px-3 py-1 transition duration-500"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`bg-teal-600 lg:flex ${
                        isMenuOpen ? "block" : "hidden"
                    } lg:flex-grow items-center justify-between absolute lg:relative top-16 lg:top-0 w-full lg:w-auto left-0 py-2 lg:py-0 px-10 lg:px-0`}
                >
                    <div className="flex gap-x-5 flex-col lg:flex-row gap-y-2 lg:gap-y-0 mb-2 lg:mb-0">
                        <Link
                            to="/"
                            className=" hover:opacity-65 transition duration-500"
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/campaigns"
                            className="hover:opacity-65 transition duration-500"
                        >
                            Campañas
                        </Link>
                    </div>
                    <div className="flex gap-x-5 items-start lg:items-stretch flex-col lg:flex-row gap-y-2 lg:gap-y-0 mb-2 lg:mb-0">
                        <Link
                            to="/login"
                            className="bg-teal-700 hover:bg-teal-800 rounded-md border border-white px-3 py-1 transition duration-500"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            to="/register"
                            className="bg-teal-700 hover:bg-teal-800 rounded-md border border-white px-3 py-1 transition duration-500"
                        >
                            Registrarse
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
