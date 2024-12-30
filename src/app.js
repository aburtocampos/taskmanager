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
const allowedOrigins = [process.env.URL_CLIENT, 'http://localhost:5173']; 
app.use(cors({
  origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, origin); 
      } else {
          callback(new Error('No permitido por CORS')); 
      }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.json());
app.use('/api', taskRoutes);
app.use('/api/auth', authRoutes);
swaggerConfig(app);

app.use(errorHandler);

module.exports = app;
