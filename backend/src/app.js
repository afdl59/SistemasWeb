const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const usersRoutes = require('./routes/users');
const dashboardRoutes = require('./routes/dashboard');
const provinciasRoutes = require('./routes/provincias');
const verticalesRoutes = require('./routes/verticales');
const clientesRoutes = require('./routes/clientes');

app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/provincias', provinciasRoutes);
app.use('/api/verticales', verticalesRoutes);
app.use('/api/clientes', clientesRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

module.exports = app;
