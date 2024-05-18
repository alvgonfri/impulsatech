import AccordionItem from "../components/AccordionItem";

function InformationPage() {
    return (
        <div className="container mx-auto mb-10 px-4 sm:px-10 xl:px-40">
            <div className="flex flex-wrap">
                <div className="w-full px-4">
                    <div className="mb-8 mx-4 lg:mx-24 text-center">
                        <h2 className="text-3xl font-bold text-teal-800 mb-6">
                            Conoce más sobre ImpulsaTech
                        </h2>
                        <p>
                            ImpulsaTech es una innovadora plataforma web de
                            crowdfunding diseñada para apoyar causas que buscan
                            acortar la brecha digital. En ImpulsaTech,
                            individuos y entidades pueden crear campañas
                            destinadas a proporcionar acceso a la tecnología,
                            educación digital y herramientas necesarias para que
                            todos puedan participar plenamente en el mundo
                            digital. Para ello, Impulsatech permite la
                            realización de donaciones económicas y de tiempo,
                            ofreciendo una forma flexible y efectiva de apoyar
                            iniciativas tecnológicas.
                        </p>
                    </div>
                </div>
            </div>

            <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-1/2">
                    <AccordionItem
                        header="¿Cómo puedo registrarme en ImpulsaTech?"
                        text="Puedes registrarte en ImpulsaTech como usuario individual o como organización. Completa el formulario de registro en nuestra página web proporcionando la información solicitada. Una vez registrado, podrás actuar como promotor o colaborador de campañas."
                    />
                    <AccordionItem
                        header="¿Qué tipos de campañas se pueden crear en ImpulsaTech?"
                        text="Se pueden crear campañas con objetivos económicos, de tiempo, o ambos. Los objetivos económicos se medirán en euros y los de tiempo en horas. Los promotores deben indicar los detalles correspondientes, como la cuenta bancaria para donaciones económicas y el periodo de tiempo esperado para donaciones de tiempo."
                    />
                    <AccordionItem
                        header="¿Cómo funcionan las donaciones económicas en ImpulsaTech?"
                        text="Las donaciones económicas se gestionan a través de una pasarela de pago segura. El dinero donado se retiene hasta que la campaña se complete o cancele. Una vez completada, los fondos se transfieren a la cuenta bancaria indicada por el promotor, menos una comisión del 3%."
                    />
                </div>
                <div className="w-full px-4 lg:w-1/2">
                    <AccordionItem
                        header="¿Puedo contribuir a una campaña sin estar registrado?"
                        text="Sí, los usuarios y organizaciones no registrados pueden realizar donaciones económicas a las campañas. Sin embargo, para hacer donaciones de tiempo o crear campañas, es necesario estar registrado."
                    />
                    <AccordionItem
                        header="¿Qué sucede si una campaña que he apoyado se cancela o se elimina?"
                        text="Si una campaña se cancela o se elimina sin haber sido completada, los colaboradores registrados pueden reinvertir su donación económica en cualquier otra campaña en curso. Las opciones de reinversión estarán disponibles en tu cuenta."
                    />
                    <AccordionItem
                        header="¿Cómo funcionan las donaciones de tiempo en ImpulsaTech?"
                        text="Las donaciones de tiempo consisten en ofrecer horas de trabajo voluntario para ayudar a reducir la brecha digital. Solo los colaboradores registrados pueden donar su tiempo. Estas donaciones están destinadas a actividades como mentoría y asesoramiento en áreas tecnológicas. Los colaboradores indican el número de horas que pueden ofrecer en un periodo determinado, y la plataforma permite seguir y computar estas horas hasta cumplir con el compromiso. Las donaciones de tiempo no pueden ser anónimas."
                    />
                </div>
            </div>
        </div>
    );
}

export default InformationPage;
