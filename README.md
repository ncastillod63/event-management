Event Management - nadineisabelcastillodominguez198

Proyecto final del Módulo 4 del curso JAvascript, enfocado en la construcción de una aplicación web tipo SPA (Single Page Application) con autenticación de usuarios usando HTML, CSS, JavaScript y JSON Server para gestionar eventos.


---

Funcionalidades

Autenticación con inicio y cierre de sesión

Registro de nuevos usuarios e inicio de sesión con roles

CRUD de eventos para administradores

Navegación entre vistas (home, login, registro, dashboard)

Persistencia de sesión con Local Storage.

Rutas protegidas y redireccionamiento.

Consumo de API simulada con json-server

---

Instalación

1. Clona el repositorio:

git clone https://github.com/ncastillod63/event-management.git
cd modulo-4-master


2. Instala dependencias:

npm install


3. Inicia la API:

npm run start:api

4. Abre en navegador: http://localhost:3000/#/login




---

Usuarios de prueba
 Administrador: admin@eventos.co / admin123
 Invitado: moises.invitado@eventos.com / invitado123
Puedes agregar usuarios manualmente en el archivo db.json en la sección "users" o registrarte mediante la vista /register.





---

Tecnologías utilizadas

HTML5

CSS3

JavaScript

JSON Server




---

Estructura del proyecto

Modulo-4-master/
├── db.json                  # Base de datos simulada
├── public/
│   ├── index.html           # Página principal
│   ├── styles.css           # Estilos CSS
│   └── js/
│       ├── api.js           # Funciones para la API
│       ├── auth.js          # Lógica de autenticación
│       ├── router.js        # Sistema de rutas
│       ├── app.js           # Entrada principal 
│       └── views.js         # Plantillas HTML por vista
├── package.json             # Configuración del proyecto
└── README.md                # Este archivo




---

Contribuciones

Este es un proyecto académico, pero si deseas contribuir o mejorarlo, ¡eres bienvenido! Puedes hacer un fork o enviar un pull request.


---

Licencia

MIT License. Uso libre para fines educativos.
