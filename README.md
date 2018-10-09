# dsa-tp-final

Prerrequisitos:

NodeJs > 8
MongoDB

API:

Para levantar la api:

- Ubicarse en la carpeta api/
- Instalar los modulos requeridos (npm install)
- Cambiar los configuraciones en el archivo config.js
- Ejecutar los seeds para popular la base (node seeds.js)
- Iniciar la app (npm start)

FRONTEND:

- Ubicarse en la carpeta frontend/
- Instalar los modulos requeridos (npm install)
- Iniciar la app (npm start), en caso de que pida confirmación para utilizar el puerto 3001, aceptar (Y)
- En caso de que la api y el frontend esten corriendo en diferentes máquinas, o cambien los puertos por defecto, reconfigurar la url de la api en el archivo frontend/src/lib/http/client.js

Notas:

- Se debe iniciar primero la api y luego el frontend
- El usuario por defecto es "admin - admin"
