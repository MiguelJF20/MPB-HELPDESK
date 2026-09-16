// ============================================================
// SERVICIOS DE LA API
// MPB HelpDesk
// ============================================================

const API_URL = "http://127.0.0.1:8000";


// ============================================================
// RESPUESTA DEL ENDPOINT DE SALUD
// ============================================================

export interface RespuestaSalud {
  sistema: string;
  estado: string;
}


// ============================================================
// VERIFICAR ESTADO DEL BACKEND
// ============================================================

export async function verificarSalud(): Promise<RespuestaSalud> {

  const respuesta = await fetch(`${API_URL}/salud`);

  if (!respuesta.ok) {
    throw new Error("El backend respondió con un error.");
  }

  const datos: RespuestaSalud = await respuesta.json();

  return datos;
}


// ============================================================
// DATOS PARA EL LOGIN
// ============================================================

export interface DatosLogin {
  login: string;
  contrasena: string;
}


// ============================================================
// INFORMACIÓN DEL USUARIO AUTENTICADO
// ============================================================

export interface UsuarioAutenticado {
  usuario_id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  telefono: string;
  cargo: string;
  login: string;
  area_id: number;
  area: string;
  abreviatura: string;
  rol_id: number;
  rol: string;
}


// ============================================================
// RESPUESTA DEL LOGIN
// ============================================================

export interface RespuestaLogin {
  autenticado: boolean;
  mensaje: string;
  usuario?: UsuarioAutenticado;
  detalle?: string;
}


// ============================================================
// INICIAR SESIÓN
// ============================================================

export async function iniciarSesion(
  datosLogin: DatosLogin
): Promise<RespuestaLogin> {

  const respuesta = await fetch(`${API_URL}/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(datosLogin),
  });


  if (!respuesta.ok) {
    throw new Error("No se pudo conectar con el servicio de autenticación.");
  }


  const datos: RespuestaLogin = await respuesta.json();

  return datos;
}