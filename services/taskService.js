// const { deleteTask } = require('../controllers/taskController');
const taskRepository = require('../repositories/taskRepository');

const 
createTask = async (taskData) => {
  return await taskRepository.createTask(taskData);
};

const getUserTasks = async (userId) => {
  return await taskRepository.findTasksByUser(userId);
};

const getAllUsersTasks = async () => {
  return await taskRepository.findAllUsersTasks();
};

const getAllMyTasks = async (userId, query) => {
    const { status, role } = query;
    const filters = {};
    
    if (status) {
        filters.status = status;
    }
    
    if (role) {
        filters.role = role;
    }
    
  return await taskRepository.findAllMyTasks(userId, filters);
};

const deleteTask = async (taskId, userRole) => {
  const task = await taskRepository.findOneTaskById(taskId);
  if (!task) {
    throw new Error('Task not found');
  }

  if (userRole !== 'admin') {
    throw new Error('Only admin can delete this task');
  }

  return await taskRepository.deleteTask(taskId);
};


const completeTask = async (taskId, userId) => {
  await taskRepository.completeTask(taskId, userId);
  return true;
};

module.exports = {
  createTask,
  getUserTasks,
  getAllUsersTasks,
  getAllMyTasks,
  deleteTask,
  completeTask,
};
