Objetivos de la aplicación

Este proyecto tiene como objetivo gestionar información de países, permitiendo:

Consultar la lista de países disponibles en el sistema.

Buscar un país por su ID.

Insertar países desde una API externa.

Renderizar vistas en EJS para la navegación.

Exponer datos también en formato JSON para integraciones con otras aplicaciones.

🛠️ Tecnologías utilizadas

Node.js → entorno de ejecución.

Express.js → framework web para manejar rutas, middlewares y controladores.

EJS → motor de plantillas para renderizar vistas dinámicas en el frontend.

Express EJS Layouts → gestión de plantillas maestras y layouts.

Axios → cliente HTTP para consumir APIs externas.

Mongoose → ORM para interactuar con bases de datos MongoDB.

Express Validator → validación de datos en formularios y peticiones.

Method-Override → permite usar métodos HTTP como PUT y DELETE desde formularios HTML.

⚙️ Requisitos previos

Antes de instalar, asegúrate de tener instalado en tu máquina:

Node.js
 (versión 18 o superior recomendada).

MongoDB
 instalado localmente o acceso a una base de datos en la nube (por ejemplo, MongoDB Atlas).

-Git para clonar el repositorio.
git clone https://github.com/usuario/mi-aplicacion-paises.git
cd mi-aplicacion-paises
-Instalar dependencias
npm install
Configurar variables de entorno
EN CARPETA CONFIG EL ARCHIVO 
en el archivo .env
configuramos el puerto y stringconection de la base de datos de mongodb
# Puerto del servidor
PORT=4000
# Configuración de la base de datos
MONGO_URI=mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js

ejecutamos el proyecto en la terminal con el comando 
node app.mjs