import { useState, type FormEvent } from "react";
import Encabezado from "./components/Encabezado";
import logoMpb from "./assets/logo-mpb.jpg";
import { iniciarSesion, type UsuarioAutenticado } from "./services/api";
import PanelTecnico from "./pages/PanelTecnico";
import PanelJefe from "./pages/PanelJefe";
import PanelRegistrador from "./pages/PanelRegistrador";

function App() {
  // Estado para controlar el usuario institucional.
  const [login, setLogin] = useState("");

  // Estado para controlar el campo de contraseña.
  const [contrasena, setContrasena] = useState("");

  // Estado para mostrar mensajes de error del formulario.
  const [mensajeError, setMensajeError] = useState("");

  // Estado para mostrar mensajes de éxito del frontend.
  const [mensajeExito, setMensajeExito] = useState("");

  // Guarda los datos del usuario que inició sesión correctamente.
  const [usuarioAutenticado, setUsuarioAutenticado] =
    useState<UsuarioAutenticado | null>(null);

  // Función que procesa el inicio de sesión.
  async function manejarInicioSesion(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    // Limpiamos los mensajes anteriores.
    setMensajeError("");
    setMensajeExito("");

    // Eliminamos espacios innecesarios.
    const loginLimpio = login.trim();
    const contrasenaLimpia = contrasena.trim();

    // ----------------------------------------------------------
    // VALIDAR USUARIO
    // ----------------------------------------------------------

    if (!loginLimpio) {
      setMensajeError("Debe ingresar su usuario institucional.");
      return;
    }

    // ----------------------------------------------------------
    // VALIDAR CONTRASEÑA
    // ----------------------------------------------------------

    if (!contrasenaLimpia) {
      setMensajeError("Debe ingresar su contraseña.");
      return;
    }

    // ----------------------------------------------------------
    // ENVIAR CREDENCIALES A FASTAPI
    // ----------------------------------------------------------

    try {
      const resultado = await iniciarSesion({
        login: loginLimpio,
        contrasena: contrasenaLimpia,
      });

      // --------------------------------------------------------
      // LOGIN INCORRECTO
      // --------------------------------------------------------

      if (!resultado.autenticado) {
        setMensajeError(resultado.mensaje);
        return;
      }

      // --------------------------------------------------------
      // LOGIN CORRECTO
      // --------------------------------------------------------

      setUsuarioAutenticado(resultado.usuario!);
    } catch (error) {
      console.error(error);

      setMensajeError("No se pudo conectar con el servidor.");
    }
  }

  // Si el usuario inició sesión correctamente,
  // mostramos el panel del técnico.
  // ============================================================
  // MOSTRAR PANEL SEGÚN EL ROL
  // ============================================================

  if (usuarioAutenticado) {
    switch (usuarioAutenticado.rol) {
      case "Tecnico":
        return <PanelTecnico usuario={usuarioAutenticado} />;

      case "Jefe":
        return <PanelJefe usuario={usuarioAutenticado} />;

      case "Registrador":
        return <PanelRegistrador usuario={usuarioAutenticado} />;

      default:
        return (
          <main className="contenedor-principal">
            <h1>Rol no configurado</h1>

            <p>
              El rol "{usuarioAutenticado.rol}" todavía no tiene un panel
              asignado.
            </p>
          </main>
        );
    }
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
            <span className="brand-badge">
              Municipalidad Provincial de Barranca
            </span>
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
              Inicia sesión para registrar o consultar tus solicitudes de
              soporte.
            </p>

            <form className="login-form" onSubmit={manejarInicioSesion}>
              <label>
                <span>Usuario institucional</span>
                <input
                  type="text"
                  value={login}
                  onChange={(evento) => setLogin(evento.target.value)}
                  placeholder="Ingrese su usuario"
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
