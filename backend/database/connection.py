# ============================================================
# CONEXIÓN A SQL SERVER
# MPB HelpDesk
# ============================================================

import pyodbc


# ============================================================
# DATOS DE CONEXIÓN
# ============================================================

# Nombre del servidor SQL Server.
SERVIDOR = "DESKTOP-C40PLB8"

# Nombre de nuestra base de datos.
BASE_DATOS = "MPBHELPDESKBD"

# Controlador ODBC que utilizaremos.
CONTROLADOR = "ODBC Driver 18 for SQL Server"


# ============================================================
# FUNCIÓN PARA OBTENER UNA CONEXIÓN
# ============================================================

def obtener_conexion():
    """
    Crea y devuelve una conexión con SQL Server.

    Se utiliza autenticación de Windows, por lo que
    no necesitamos escribir usuario ni contraseña de SQL Server.
    """

    cadena_conexion = (
        f"DRIVER={{{CONTROLADOR}}};"
        f"SERVER={SERVIDOR};"
        f"DATABASE={BASE_DATOS};"
        "Trusted_Connection=yes;"
        "TrustServerCertificate=yes;"
    )

    # Creamos la conexión con SQL Server.
    conexion = pyodbc.connect(cadena_conexion)

    # Devolvemos la conexión para que pueda ser utilizada
    # por las diferentes partes del backend.
    return conexion