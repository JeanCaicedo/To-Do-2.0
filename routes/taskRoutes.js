const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

// Endpoint para crear una tarea (POST /tasks/create-task)
router.post('/create-task', authMiddleware, taskController.createTask);

// obtener un de todas las tareas de un usuario (GET /tasks/user-task)
router.get('/user-task', authMiddleware, taskController.getUserTasks);

// obtener un listado de todas las tareas de todos los usuarios (GET /tasks/all-users-tasks)
router.get('/all-users-tasks', authMiddleware, taskController.getAllUsersTasks);

// eliminar tarea (DELETE /tasks/delete-task) nota: esto solo puede ser realizado por el administrador
router.delete('/delete-task/:id', authMiddleware, taskController.deleteTask)

// Marcar tarea como completada (PUT /tasks/complete-task) nota: solo puedo marcar como terminada la tarea, si soy el dueño de la misma
router.put('/complete-task/:id', authMiddleware, taskController.completeTask)

module.exports = router;
