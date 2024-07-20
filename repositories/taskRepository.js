const Task = require('../models/task');
const { Types } = require('mongoose');

const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

const findTasksByUser = async (userId) => {
  return await Task.find({ user: userId });
};

const findAllUsersTasks = async (
  // userId, 
  // filters
) => {
  // const query = { user: userId };
  
  // if (filters) {
      
  //     if(filters.status) {
  //         query.status = filters.status;
  //       }
        
  //       if(filters.role) {
  //           query['creator.role'] = filters.role;
  //       }
  //   }

  return await Task.find().populate('user');
};

const deleteTask = async (taskId) => {
  return await Task.deleteOne({ _id: new Types.ObjectId(taskId) });
};

const findOneTaskById = async (taskId) => {
  return await Task.findById(taskId);
}

const  completeTask = async (taskId, userId) => {
  return Task.findByIdAndUpdate(taskId, { status: 'completed' }, { new: true });
}

module.exports = {
  createTask,
  findTasksByUser,
  findAllUsersTasks,
  deleteTask,
  completeTask,
  findOneTaskById,
};
