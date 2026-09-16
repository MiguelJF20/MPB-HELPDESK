// ============================================================
// PANEL DEL TÉCNICO
// MPB HelpDesk
// ============================================================
import type { UsuarioAutenticado } from "../services/api";

interface PropsPanelTecnico {
  usuario: UsuarioAutenticado;
}

function PanelTecnico({ usuario }: PropsPanelTecnico) {
  return (
    <main className="panel-tecnico">
      {/* ======================================================
          ENCABEZADO
          ====================================================== */}
      <header className="panel-header">
        <div>
          <p className="eyebrow">MPB HelpDesk</p>
          <h1>Panel del Técnico</h1>
          <p>
            Oficina de Tecnologías de la Información
          </p>
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

      {/* ======================================================
          CONTENIDO PRINCIPAL
          ====================================================== */}
      <section className="panel-contenido">

        <div className="bienvenida-panel">
          <h2>Bienvenido, {usuario.nombres}</h2>
          <p>
            Desde este panel podrás gestionar las incidencias
            asignadas al personal técnico.
          </p>
        </div>

        {/* ====================================================
            TARJETAS DE RESUMEN
            ==================================================== */}
        <div className="estadisticas-panel">

          <article className="tarjeta-estadistica">
            <span className="icono-estadistica">🎫</span>
            <div>
              <strong>0</strong>
              <span>Incidencias pendientes</span>
            </div>
          </article>

          <article className="tarjeta-estadistica">
            <span className="icono-estadistica">⚠️</span>
            <div>
              <strong>0</strong>
              <span>Incidencias urgentes</span>
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

        {/* ====================================================
            BANDEJA DE INCIDENCIAS
            ==================================================== */}
        <section className="seccion-incidencias">

          <div className="titulo-seccion">
            <div>
              <h2>Incidencias pendientes</h2>
              <p>
                Aquí aparecerán las solicitudes que requieren
                atención técnica.
              </p>
            </div>

            <button className="boton-secundario">
              Actualizar
            </button>
          </div>

          <div className="tabla-vacia">
            <span>🎫</span>

            <h3>No hay incidencias pendientes</h3>

            <p>
              Las nuevas solicitudes aparecerán aquí cuando
              sean registradas en el sistema.
            </p>
          </div>

        </section>

      </section>
    </main>
  );
}

export default PanelTecnico;