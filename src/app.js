const express = require('express');
const bodyParser = require('body-parser');
//const connectDB = require('./config/db');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerConfig = require('./swagger/swaggerConfig');
const errorHandler = require('./helper/errorHandler');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: process.env.URL_CLIENT, // Permitir client url
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  }));
app.use(bodyParser.json());
app.use('/api', taskRoutes);
app.use('/api/auth', authRoutes);
swaggerConfig(app);

app.use(errorHandler);

module.exports = app;
