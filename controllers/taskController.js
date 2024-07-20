const taskService = require('../services/taskService');

const getAllUsersTasks = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tiene permitido realizar la accion' });
    }
    const tasks = await taskService.getAllUsersTasks();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const taskData = { ...req.body, user: req.user._id };
    const newTask = await taskService.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const tasks = await taskService.getUserTasks(req.user._id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tiene permitido realizar la accion' });
    }
    const { params, user } = req;
    const { id: taskId } = params;
    const { role } = user;

    const task = await taskService.deleteTask(taskId, role);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const completeTask = async (req, res) => {
  try {
    const { params, user } = req;
    const { id: taskId } = params;
    const { _id: userId } = user;
    const task = await taskService.completeTask(taskId, userId);
    res.status(200).json({ message: 'task complete' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createTask,
  getUserTasks,
  getAllUsersTasks,
  deleteTask,
  completeTask,
};
