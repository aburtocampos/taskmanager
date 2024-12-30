const Task = require('../models/Task');
const { validationResult } = require('express-validator');

const getAllTasks = async (req, res) => {
    try {
        const { completed } = req.query;

        let filter = {};

        if (completed !== undefined) {
            filter.completed = completed === 'true'; 
        }

        const tasks = await Task.find(filter);

        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

const getTaskById = async (req, res) => {
    try {
        // Verifica si el taskId es válido (debe ser un número)
        if (isNaN(req.params.id)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }

        // Busca la tarea por taskId
        const task = await Task.findOne({ taskId: req.params.id });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        console.error("Error getting task:", err.message);
        res.status(500).json({ error: "Error getting task" });
    }
};

const createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: 'The Title already exist' });
        } else {
            res.status(500).json({ error: 'Error creating the task' });
        }
        //res.status(500).json({ error: 'Error creating task' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        if (!title) {
            return res.status(400).json({ errors: [{ msg: "Title is required" }] });
        }

        // Buscar y actualizar la tarea usando taskId
        const task = await Task.findOneAndUpdate(
            { taskId: req.params.id },
            { title, description, completed },
            { new: true } 
        );

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        console.error("Error updating task:", err.message);
        res.status(500).json({ error: "Error updating task" });
    }
};

const deleteTask = async (req, res) => {
    try {
        // Verifica que el taskId sea válido (por ejemplo, si esperas un número)
        if (isNaN(req.params.id)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }

        // Intenta eliminar la tarea basada en el taskId
        const task = await Task.findOneAndDelete({ taskId: req.params.id });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error("Error deleting task:", err.message);
        res.status(500).json({ error: "Error deleting task" });
    }
};


module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
