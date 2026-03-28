import React from "react";

const PoliticasPrivacidad: React.FC = () => {
  return (
    <div className=" text-gray-500 min-h-screen py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-sky-700">
          Términos y Políticas de TutorTesis
        </h1>

        {/* Sección 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-sky-300">
            1. Términos y Condiciones
          </h2>
          <p>
            Estos Términos y Condiciones regulan el uso de la plataforma
            <strong> TutorTesis</strong>, registrada en Bolivia, que ofrece
            cursos online, asesorías, servicios académicos y talleres para
            instituciones nacionales e internacionales.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Cursos virtuales con acceso ilimitado una vez adquiridos.</li>
            <li>Asesorías virtuales y presenciales.</li>
            <li>Servicios de catering para profesionales.</li>
            <li>
              Elaboración de trabajos académicos: tesis, proyectos de grado,
              monografías, planes de negocios.
            </li>
            <li>
              Revisión y formato de documentos en normas APA y Vancouver.
            </li>
            <li>Escaneo y reducción de plagio.</li>
            <li>Revisión de diapositivas para defensa.</li>
          </ul>
          <p>
            El acceso a los cursos es personal e intransferible. Los pagos son
            únicos y <strong>no se realizan reembolsos</strong> bajo ninguna
            circunstancia, salvo que el curso o servicio no se habilite.
          </p>
        </section>

        {/* Sección 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-sky-300">
            2. Política de Privacidad
          </h2>
          <p>
            TutorTesis recopila datos como nombre, correo electrónico,
            información de pago e historial de cursos. Estos datos se utilizan
            para acceso, facturación y comunicación.
          </p>
          <p>
            Implementamos medidas técnicas y organizativas para proteger la
            información. Los datos solo se comparten con pasarelas de pago y
            proveedores de servicios necesarios. Los usuarios tienen derecho a
            acceso, rectificación y eliminación de datos conforme a la normativa
            boliviana y estándares internacionales.
          </p>
        </section>

        {/* Sección 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-sky-300">
            3. Acuerdo de Nivel de Servicio (SLA)
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Disponibilidad garantizada del 99%.</li>
            <li>Soporte técnico con respuesta en máximo 24 horas.</li>
            <li>Acceso estable y garantizado a materiales.</li>
            <li>
              Compensaciones evaluadas según contrato con instituciones en caso
              de incumplimiento.
            </li>
          </ul>
          <p>
            Este SLA aplica únicamente a contratos con instituciones, no a
            usuarios individuales.
          </p>
        </section>

        {/* Sección 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-sky-300">
            4. Políticas adicionales
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>No hay reembolsos salvo que el curso no se habilite.</li>
            <li>Acceso ilimitado a los cursos una vez adquiridos.</li>
            <li>
              Servicios académicos y profesionales sujetos a disponibilidad y
              acuerdos específicos.
            </li>
          </ul>
        </section>

        {/* Conclusión */}
        <section>
          <h2 className="text-2xl font-semibold text-sky-300">Conclusión</h2>
          <p>
            Estos documentos establecen las reglas de uso, protección de datos y
            compromisos de TutorTesis, brindando confianza a estudiantes,
            profesionales e instituciones que contraten nuestros servicios.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PoliticasPrivacidad;
