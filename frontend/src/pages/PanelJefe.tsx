// ============================================================
// PANEL DEL JEFE
// MPB HelpDesk
// ============================================================

import type { UsuarioAutenticado } from "../services/api";

interface PropsPanelJefe {
  usuario: UsuarioAutenticado;
}

function PanelJefe({ usuario }: PropsPanelJefe) {
  return (
    <main className="panel-tecnico">
      <header className="panel-header">
        <div>
          <p className="eyebrow">MPB HelpDesk</p>
          <h1>Panel del Jefe</h1>
          <p>Oficina de Tecnologías de la Información</p>
        </div>

        <div className="usuario-panel">
          <span>👤</span>

          <div>
            <strong>
              {usuario.nombres} {usuario.apellido_paterno}
            </strong>

            <small>{usuario.cargo}</small>
          </div>
        </div>
      </header>

      <section className="panel-contenido">
        <div className="bienvenida-panel">
          <h2>Bienvenido, {usuario.nombres}</h2>

          <p>
            Desde este panel podrás supervisar la gestión de las
            incidencias y consultar los indicadores de la mesa de ayuda.
          </p>
        </div>

        <div className="estadisticas-panel">
          <article className="tarjeta-estadistica">
            <span className="icono-estadistica">🎫</span>

            <div>
              <strong>0</strong>
              <span>Incidencias registradas</span>
            </div>
          </article>

          <article className="tarjeta-estadistica">
            <span className="icono-estadistica">⏳</span>

            <div>
              <strong>0</strong>
              <span>Incidencias pendientes</span>
            </div>
          </article>

          <article className="tarjeta-estadistica">
            <span className="icono-estadistica">✅</span>

            <div>
              <strong>0</strong>
              <span>Incidencias atendidas</span>
            </div>
          </article>
        </div>

        <section className="seccion-incidencias">
          <div className="titulo-seccion">
            <div>
              <h2>Resumen de la mesa de ayuda</h2>

              <p>
                Aquí se mostrarán los indicadores de gestión
                cuando conectemos el panel con las incidencias.
              </p>
            </div>
          </div>

          <div className="tabla-vacia">
            <span>📊</span>

            <h3>Indicadores en preparación</h3>

            <p>
              Los datos serán obtenidos posteriormente desde
              MPBHELPDESKBD.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default PanelJefe;