const express = require('express');
const { body } = require('express-validator');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const authHandler = require('../helper/authHandler');
const router = express.Router();

/** Comment to the Swagger Documentation works for every endpoint on the API **/



/**
 * @swagger
 * /tasks:
 *   post:
 *     tags:
 *       ["Tasks"]
 *     summary: Create a new task
 *     description: Create a new task by providing a required title and optional description, the completed field is set in false by default, and there is a field named createdAt with the date when the task is being created.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: Purchase 65 inches TV 
 *               description:
 *                 type: string
 *                 description: A brief description of the task
 *                 example: Going to the market and choose the best brand in TVs
 *     security:
 *       - bearerAuth: [] # Requiere autenticación con JWT
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 */
router.post(
    '/tasks',
    authHandler,
    [body('title').notEmpty().withMessage('Title is required')],
    createTask
);


/**
 * @swagger
 * /tasks:
 *   get:
 *     tags:
 *       ["Tasks"]
 *     summary: Retrieve all tasks
 *     description: Retrieve a list of tasks, optionally filtered by their completion status (completed or pending).
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter tasks by their completion status. Use `true` for completed tasks and `false` for pending tasks. If no parameter is passed, all tasks will be returned.
 *         example: true
 *     security:
 *       - bearerAuth: [] # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/tasks',authHandler, getAllTasks);


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     tags:
 *       ["Tasks"]
 *     summary: Retrieve a task by ID
 *     description: Retrieve details of a specific task by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task
 *     security:
 *       - bearerAuth: [] # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Task not found
 */
router.get('/tasks/:id',authHandler, getTaskById);


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     tags:
 *       ["Tasks"]
 *     summary: Update a task
 *     description: Update the details of a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the task
 *                 example: Buy groceries for the week
 *               description:
 *                 type: string
 *                 description: The updated description of the task
 *                 example: Milk, eggs, bread, and fruits
 *               completed:
 *                 type: boolean
 *                 description: The updated completion status
 *                 example: false
 *     security:
 *       - bearerAuth: [] # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put('/tasks/:id',authHandler, updateTask);


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     tags:
 *       ["Tasks"]
 *     summary: Delete a task
 *     description: Remove a task from the system by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete
 *     security:
 *       - bearerAuth: [] # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete('/tasks/:id',authHandler, deleteTask);

module.exports = router;
