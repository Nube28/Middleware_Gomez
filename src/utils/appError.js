const fs = require('fs');
const path = require('path');
const winston = require('winston');

// Asegurar directorio de logs
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configurar Winston
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'error.log') })
  ],
});

// Clase personalizada que extiende de error
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware global de manejo de errores
const globalErrorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    statusCode: err.statusCode,
    stack: err.stack,
  });

  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message,
  });
};

module.exports = { AppError, globalErrorHandler };