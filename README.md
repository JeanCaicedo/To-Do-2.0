# To-Do-2.0

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

API REST de tareas con **autenticación JWT** y **arquitectura en capas** (routes, controllers, services, repositories). Es la evolución del proyecto `todo-api`: la versión 2 con una estructura más madura, pensada para practicar separación de responsabilidades en un backend Node.

Proyecto de aprendizaje.

## Stack

- **Runtime:** Node.js
- **Framework:** Express 4
- **BD:** MongoDB vía Mongoose 8
- **Auth:** JWT (`jsonwebtoken`) + `bcrypt`
- **Arquitectura:** routes → controllers → services → repositories

## Arquitectura en capas

```
To-Do-2.0/
├── server.js               # Arranque y conexión a MongoDB
├── config/
│   └── db.js               # Conexión Mongoose
├── routes/                 # Definición de endpoints
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
├── controllers/            # Manejo de req/res
│   ├── authController.js
│   ├── taskController.js
│   └── userController.js
├── services/               # Reglas de negocio
│   ├── authService.js
│   ├── taskService.js
│   └── userService.js
├── repositories/           # Acceso a datos
├── models/                 # Esquemas Mongoose
│   ├── user.js
│   ├── task.js
│   └── invalidToken.js     # Blacklist de tokens (logout)
├── middlewares/            # Auth middleware
└── utils/
```

## Modelos

### User

- `name`, `email` (único), `password` (hash bcrypt), `role` (`user` | `admin`)

### Task

- `title`, `description`, `status` (`pendiente` | `iniciada` | `por terminar` | `terminada`), `user` (ref a User), timestamps.

### InvalidToken

- Blacklist de tokens invalidados por logout, para que un JWT cerrado no pueda reutilizarse.

## Endpoints

Base: `http://localhost:5000/api`

### Autenticación (`/auth`)

| Método | Ruta                | Auth | Descripción                     |
| ------ | ------------------- | ---- | ------------------------------- |
| POST   | `/register`         | No   | Registrar usuario               |
| POST   | `/login`            | No   | Iniciar sesión (devuelve JWT)   |
| POST   | `/logout`           | Sí   | Cerrar sesión (invalida token)  |
| PUT    | `/change-password`  | Sí   | Cambiar contraseña              |

### Tareas (`/tasks`)

| Método | Ruta                    | Auth | Descripción                                           |
| ------ | ----------------------- | ---- | ----------------------------------------------------- |
| POST   | `/create-task`          | Sí   | Crear una tarea                                       |
| GET    | `/user-task`            | Sí   | Listar tareas del usuario autenticado                 |
| GET    | `/all-users-tasks`      | Sí   | Listar tareas de todos los usuarios                   |
| PUT    | `/complete-task/:id`    | Sí   | Marcar tarea como completada (solo el dueño)          |
| DELETE | `/delete-task/:id`      | Sí   | Eliminar tarea (rol `admin`)                          |

## Flujo de autenticación

1. `POST /api/auth/register` con `{ name, email, password, role }`.
2. `POST /api/auth/login` devuelve un JWT.
3. En las rutas protegidas, enviar el header: `Authorization: Bearer <token>`.
4. `POST /api/auth/logout` añade el token a la blacklist `InvalidToken`; intentos posteriores con ese token se rechazan.

## Setup

```bash
# Instalar dependencias
npm install

# Arrancar (usa node --watch)
npm start
```

Variables de entorno (copiar `.env.example` a `.env` y completar):

```env
PORT=5000
MONGO_URI=mongodb+srv://usuario:password@cluster/db
JWT_SECRET=tu_secreto
```

## Notas

- Es la v2 de `todo-api`, con arquitectura en capas mucho más clara.
- Proyecto de aprendizaje, pero con una estructura cercana a la que se usaría en un backend real.

## Autor

Jean Caicedo — [@JeanCaicedo](https://github.com/JeanCaicedo)
