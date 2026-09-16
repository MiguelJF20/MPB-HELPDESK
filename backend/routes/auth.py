# ============================================================
# AUTENTICACIÓN
# MPB HelpDesk
# ============================================================

from fastapi import APIRouter
from pydantic import BaseModel
from pwdlib import PasswordHash

from database.connection import obtener_conexion


# Creamos el router para las rutas de autenticación.
router = APIRouter(
    prefix="/auth",
    tags=["Autenticación"]
)


# ============================================================
# MODELO DE DATOS PARA EL LOGIN
# ============================================================

class DatosLogin(BaseModel):
    login: str
    contrasena: str


# ============================================================
# CONFIGURACIÓN DE ARGON2
# ============================================================

password_hash = PasswordHash.recommended()


# ============================================================
# ENDPOINT DE LOGIN
# ============================================================

@router.post("/login")
def iniciar_sesion(datos: DatosLogin):

    conexion = None

    try:

        # ----------------------------------------------------
        # 1. CONECTAR CON SQL SERVER
        # ----------------------------------------------------

        conexion = obtener_conexion()
        cursor = conexion.cursor()

        # ----------------------------------------------------
        # 2. BUSCAR AL USUARIO
        # ----------------------------------------------------
        #
        # Buscamos por el campo "login".
        #
        # También obtenemos:
        # - datos personales
        # - área
        # - cargo
        # - rol
        # - contraseña cifrada
        # - estado
        #
        # ----------------------------------------------------

        consulta = """
            SELECT
                u.usuario_id,
                u.nombres,
                u.apellido_paterno,
                u.apellido_materno,
                u.email,
                u.telefono,
                u.cargo,
                u.login,
                u.password_hash,
                u.estado,
                a.area_id,
                a.nombre AS area,
                a.abreviatura,
                r.rol_id,
                r.nombre AS rol
            FROM Usuario u
            INNER JOIN Area a
                ON u.area_id = a.area_id
            INNER JOIN Rol r
                ON u.rol_id = r.rol_id
            WHERE u.login = ?
        """

        cursor.execute(
            consulta,
            datos.login.strip()
        )

        usuario = cursor.fetchone()

        # ----------------------------------------------------
        # 3. COMPROBAR SI EXISTE EL USUARIO
        # ----------------------------------------------------

        if not usuario:
            return {
                "autenticado": False,
                "mensaje": "Credenciales incorrectas."
            }

        # ----------------------------------------------------
        # 4. COMPROBAR SI EL USUARIO ESTÁ ACTIVO
        # ----------------------------------------------------

        if not usuario.estado:
            return {
                "autenticado": False,
                "mensaje": "El usuario se encuentra inactivo."
            }

        # ----------------------------------------------------
        # 5. VERIFICAR CONTRASEÑA CON ARGON2
        # ----------------------------------------------------

        contrasena_correcta = password_hash.verify(
            datos.contrasena,
            usuario.password_hash
        )

        if not contrasena_correcta:
            return {
                "autenticado": False,
                "mensaje": "Credenciales incorrectas."
            }

        # ----------------------------------------------------
        # 6. LOGIN CORRECTO
        # ----------------------------------------------------

        return {
            "autenticado": True,
            "mensaje": "Inicio de sesión correcto.",
            "usuario": {
                "usuario_id": usuario.usuario_id,
                "nombres": usuario.nombres,
                "apellido_paterno": usuario.apellido_paterno,
                "apellido_materno": usuario.apellido_materno,
                "email": usuario.email,
                "telefono": usuario.telefono,
                "cargo": usuario.cargo,
                "login": usuario.login,
                "area_id": usuario.area_id,
                "area": usuario.area,
                "abreviatura": usuario.abreviatura,
                "rol_id": usuario.rol_id,
                "rol": usuario.rol
            }
        }

    except Exception as error:

        return {
            "autenticado": False,
            "mensaje": "Ocurrió un error al procesar el inicio de sesión.",
            "detalle": str(error)
        }

    finally:

        # Cerramos la conexión cuando terminamos.
        if conexion:
            conexion.close()