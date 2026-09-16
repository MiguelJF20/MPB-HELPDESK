import { useState, type FormEvent } from "react";
import Encabezado from "./components/Encabezado";
import logoMpb from "./assets/logo-mpb.jpg";

function App() {
  // Estado para controlar el campo de correo institucional.
  const [correo, setCorreo] = useState("");

  // Estado para controlar el campo de contraseña.
  const [contrasena, setContrasena] = useState("");

  // Estado para mostrar mensajes de error del formulario.
  const [mensajeError, setMensajeError] = useState("");

  // Estado para mostrar mensajes de éxito del frontend.
  const [mensajeExito, setMensajeExito] = useState("");

  // Función que procesa el inicio de sesión.
  // Esta validación es del frontend; la validación real con FastAPI se hará después.
  function manejarInicioSesion(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    setMensajeError("");
    setMensajeExito("");

    const correoLimpio = correo.trim();
    const contrasenaLimpia = contrasena.trim();

    if (!correoLimpio) {
      setMensajeError("Debe ingresar su correo institucional.");
      return;
    }

    if (!contrasenaLimpia) {
      setMensajeError("Debe ingresar su contraseña.");
      return;
    }

    if (!correoLimpio.toLowerCase().endsWith("@munibarranca.gob.pe")) {
      setMensajeError("Debe utilizar un correo institucional terminado en @munibarranca.gob.pe.");
      return;
    }

    setMensajeExito("Los datos fueron validados. Próximamente se conectará con FastAPI.");
  }

  return (
    <main className="contenedor-principal login-page">
      <div className="login-shell">
        <aside className="login-panel login-panel-brand">
          <div className="brand-block">
            <img
              src={logoMpb}
              alt="Logo de la Municipalidad Provincial de Barranca"
              className="brand-logo"
            />
            <span className="brand-badge">Municipalidad Provincial de Barranca</span>
          </div>

          <div className="brand-copy">
            <h1>Mesa de ayuda de MPB</h1>
            <p>
              Sistema institucional para gestionar solicitudes, incidencias y
              soporte técnico de la municipalidad.
            </p>
          </div>
        </aside>

        <section className="login-panel login-panel-form">
          <Encabezado />

          <div className="tarjeta-bienvenida">
            <p className="eyebrow">Acceso al sistema</p>
            <h2>Bienvenido</h2>
            <p>
              Inicia sesión para registrar o consultar tus solicitudes de soporte.
            </p>

            <form className="login-form" onSubmit={manejarInicioSesion}>
              <label>
                <span>Correo institucional</span>
                <input
                  type="email"
                  value={correo}
                  onChange={(evento) => setCorreo(evento.target.value)}
                  placeholder="usuario@munibarranca.gob.pe"
                />
              </label>

              <label>
                <span>Contraseña</span>
                <input
                  type="password"
                  value={contrasena}
                  onChange={(evento) => setContrasena(evento.target.value)}
                  placeholder="••••••••"
                />
              </label>

              {mensajeError && <p className="mensaje-error">{mensajeError}</p>}
              {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}

              <div className="login-actions">
                <button type="submit" className="boton-principal">
                  Iniciar sesión
                </button>
                <a href="#" className="link-recuperar">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;