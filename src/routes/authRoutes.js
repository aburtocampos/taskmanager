const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       ["Users"]
 *     summary: Register a new user
 *     description: Allows you to register a new user with username and password.
 *     security: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       ["Users"]
 *     summary: Login a user
 *     description: Authenticates the user and returns a JWT token.
 *     security: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

module.exports = router;
