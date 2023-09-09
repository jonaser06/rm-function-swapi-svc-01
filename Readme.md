# Prueba técnica

## Requerimientos

1. Serverless framework
2. AWS CLI
3. Cuenta de AWS
4. Node 16.x

## Setup

Despues de haber clonado el repositorio se procede con las instalación de dependencias, esto esta automatizado dentro de script de makefile, solo basta con ejecutar en la consolta el comando

``
make install
``
en este paso ya se asume que tiene instalado **Nodejs** y **Serveless framework**, esto es importante por que sin ello no se podra ejecutar los siguientes scripts.

## Ejecución

se cuenta con varias ejecuciones

|Script|Descripción|
|------|-----------|
|``make sls.init``| crea un nuevo proyecto de Serveless framework en blanco con un ejemplo|
|``make sls.start``| ejecuta los lambdas en un entorno local "localhost:3000" se usara para levantar el proyecto actual, es obligatorio haber ejecutado previamente make install|
|``make sls.deploy``| compila y despliega el proyecto a la nube de aws, es necesario haber configurado las credenciales de la cuenta con los permisos necesarios para desplegar la infraestructura|
|``make sls.test``| ejecuta pruebas al los lambdas |

## Ejemplo de credenciales
por lo general cuando inicias tu cuenta en aws te permite establecer las credenciales por medio de un archivo "credentials" o a traves de variables de entorno
### credentials
``
[default]
aws_access_key_id = XXXXXXXXXXXXXXXXXXXX;
aws_secret_access_key = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
aws_sesion_token = xxxxxx.......xxxxxxxxx
``
### Environments
``
export AWS_ACCESS_KEY_ID="XXXXXXXXXXXXXXXXXXXX"
export AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
export AWS_SESSION_TOKEN="xxxxxx.......xxxxxxxxx"
``

## Lista de Endpoints
una vez desplegado el proyecto en local o en una cuenta de aws se tendra unos enpoints que se describen a continuacion

|metodo|url|descripción|
|------|---|-----------|
|**get**|https://xxxxx.execute-api.us-east-1.amazonaws.com/production/list-species/{id}|Este endpoint consulta a la api de swapi por las especies del universo de starwars, una vez obtenido, traduce los atributos de las respuestas, luego las procede a guardar, de tal manera que en la proxima consulta, si es que el id de consulta ya existe la retornara directamente de la base de datos de Dynamodb*|
|**post**|https://xxxxx.execute-api.us-east-1.amazonaws.com/production/add-species|Este endpoint registra directamente la especie a la tabla de dynamo, validando siempre si el id ingresado existe previamente, este metodo exige un body json**|

*El primer endpoint, avisara si su respuesta es desde el api de swapi o si viene de dynamo
- message: "Success from swapi"
- message: "Success from dynamo"

**Body de ejemplo:

``
{
        "id": "1", 
        "nombre": "specie nueva",
        "clasificacion": "mammal",
        "designacion": "sentient",
        "altura_promedio": "100",
        "colores_de_piel": "gray",
        "colores_de_cabello": "black",
        "colores_de_ojos": "blue",
        "esperanza_de_vida_promedio": "120",
        "planeta_natal": "https://swapi.py4e.com/api/planets/14/",
        "idioma": "Shyriiwook",
        "personas": [
            "https://swapi.py4e.com/api/people/13/",
            "https://swapi.py4e.com/api/people/80/"
        ],
        "peliculas": [
            "https://swapi.py4e.com/api/films/1/",
            "https://swapi.py4e.com/api/films/2/"
        ],
        "creado": "2014-12-10T16:44:31.486000Z",
        "editado": "2014-12-20T21:36:42.142000Z",
        "url": "https://swapi.py4e.com/api/species/3/"
    }
``
## Responses
todos los endpoint tienen un campo "message" en las respuestas, asi como tambien su cabecera con el codigo de respuesta, esto esta definido en el archivo "./app/src/utils/response.ts"
## Loggers
Tambien se implemento de manera personalizada la normalización de registros en una función Lambda de AWS utilizando la biblioteca @aws-lambda-powertools/logger. La normalización de registros garantiza que los registros generados por esta función sigan un formato coherente, lo que facilita su análisis y su integración con herramientas de monitoreo y análisis de registros. esto esta en el archivo "./app/src/utils/logger.ts"