require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const { AppError, globalErrorHandler } = require('./utils/appError');

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/users', userRoutes);

// Rutas no encontradas
app.all(/.*/, (req, res, next) => {
  next(new AppError(`No se encontró ${req.originalUrl}`, 404));
});

// Manejo global de errores
app.use(globalErrorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));