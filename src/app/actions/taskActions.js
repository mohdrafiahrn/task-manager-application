"use server";

import connectDB from "@/app/lib/db";
import Task from "@/app/models/Task.model";

// Add New Task
export const addTask = async (title, description, dueDate) => {
  try {
    await connectDB();
    const newTask = new Task({ title, description, dueDate, completed: false });
    await newTask.save();
    return { success: true, message: "Task added successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to add task!" };
  }
};

// Get All Tasks
export const getTasks = async () => {
  try {
    await connectDB();
    const tasks = await Task.find();
    return tasks.map(task => ({
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      completed: task.completed
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Update Task
export const updateTask = async (taskId, updatedData) => {
  try {
    await connectDB();
    await Task.findByIdAndUpdate(taskId, updatedData);
    return { success: true, message: "Task updated!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error updating task!" };
  }
};

// Delete Task
export const deleteTask = async (taskId) => {
  try {
    await connectDB();
    await Task.findByIdAndDelete(taskId);
    return { success: true, message: "Task deleted!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error deleting task!" };
  }
};
