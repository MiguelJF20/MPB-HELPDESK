from fastapi import FastAPI

# Creamos la aplicación principal de FastAPI.
app = FastAPI(
    title="MPB HelpDesk API",
    description="API del sistema web de mesa de ayuda de la Municipalidad Provincial de Barranca",
    version="1.0.0"
)


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