from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.connection import obtener_conexion
from routes.auth import router as router_auth

# Creamos la aplicación principal de FastAPI.
app = FastAPI(
    title="MPB HelpDesk API",
    description="API del sistema web de mesa de ayuda de la Municipalidad Provincial de Barranca",
    version="1.0.0"
)

# ============================================================
# CONFIGURACIÓN CORS
# ============================================================
# Permitimos que nuestro frontend de React pueda comunicarse
# con este backend de FastAPI.
#
# React/Vite normalmente funciona en:
# http://localhost:5173
#
# FastAPI funciona en:
# http://127.0.0.1:8000
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# RUTAS
# ============================================================
app.include_router(router_auth)

@app.get("/")
def inicio():
    """
    Endpoint inicial para verificar que el backend funciona.
    """
    return {
        "mensaje": "Bienvenido a la API de MPB HelpDesk",
        "estado": "Backend funcionando correctamente"
    }


@app.get("/salud")
def verificar_salud():
    """
    Endpoint para comprobar el estado del servicio.
    """
    return {
        "sistema": "MPB HelpDesk",
        "estado": "operativo"
    }

# ============================================================
# PRUEBA DE CONEXIÓN CON LA BASE DE DATOS
# ============================================================

@app.get("/bd/salud")
def verificar_base_datos():
    """
    Comprueba que FastAPI puede conectarse
    directamente con MPBHELPDESKBD.
    """

    conexion = None

    try:
        # Obtenemos una conexión con SQL Server.
        conexion = obtener_conexion()

        # Creamos un cursor para ejecutar consultas SQL.
        cursor = conexion.cursor()

        # Consultamos el nombre de la base de datos actual.
        cursor.execute("SELECT DB_NAME()")

        # Obtenemos el resultado.
        nombre_bd = cursor.fetchone()[0]

        # Devolvemos la información a React/FastAPI.
        return {
            "estado": "conectado",
            "base_datos": nombre_bd
        }

    except Exception as error:
        return {
            "estado": "error",
            "mensaje": str(error)
        }

    finally:
        # Cerramos la conexión cuando terminamos.
        if conexion:
            conexion.close()