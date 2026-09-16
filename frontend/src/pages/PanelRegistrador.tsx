// ============================================================
// PANEL DEL REGISTRADOR
// MPB HelpDesk
// ============================================================

import type { UsuarioAutenticado } from "../services/api";

interface PropsPanelRegistrador {
  usuario: UsuarioAutenticado;
}

function PanelRegistrador({ usuario }: PropsPanelRegistrador) {
  return (
    <main className="panel-tecnico">
      <header className="panel-header">
        <div>
          <p className="eyebrow">MPB HelpDesk</p>
          <h1>Panel del Registrador</h1>
          <p>Municipalidad Provincial de Barranca</p>
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
            Desde este panel podrás registrar solicitudes de soporte
            para ti o para otros usuarios autorizados.
          </p>
        </div>

        <div className="estadisticas-panel">
          <article className="tarjeta-estadistica">
            <span className="icono-estadistica">➕</span>

            <div>
              <strong>Registrar</strong>
              <span>Nueva incidencia</span>
            </div>
          </article>

          <article className="tarjeta-estadistica">
            <span className="icono-estadistica">🎫</span>

            <div>
              <strong>0</strong>
              <span>Solicitudes registradas</span>
            </div>
          </article>

          <article className="tarjeta-estadistica">
            <span className="icono-estadistica">🔎</span>

            <div>
              <strong>0</strong>
              <span>En seguimiento</span>
            </div>
          </article>
        </div>

        <section className="seccion-incidencias">
          <div className="titulo-seccion">
            <div>
              <h2>Mis registros</h2>

              <p>
                Aquí aparecerán las solicitudes que hayas registrado
                para ti o para otros usuarios.
              </p>
            </div>

            <button className="boton-secundario">
              Nueva solicitud
            </button>
          </div>

          <div className="tabla-vacia">
            <span>🎫</span>

            <h3>No hay solicitudes registradas</h3>

            <p>
              Cuando registres una incidencia, aparecerá en esta
              sección.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default PanelRegistrador;