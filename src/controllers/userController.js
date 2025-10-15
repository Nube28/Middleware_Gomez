const { AppError } = require('../utils/appError');

let users = [];

// Obtener todos los usuarios
const getUsers = (req, res, next) => {
  res.json({ status: 'success', users });
};

// Agregar usuario
const addUser = (req, res, next) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return next(new AppError('Nombre y email son requeridos', 400));
  }

  users.push({ nombre, email });
  res.status(201).json({ status: 'success', message: 'Usuario agregado', users });
};

// Eliminar usuario por índice
const deleteUser = (req, res, next) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= users.length) {
    return next(new AppError('Usuario no encontrado', 404));
  }

  const eliminado = users.splice(index, 1);
  res.json({ status: 'success', message: 'Usuario eliminado', eliminado });
};

module.exports = { getUsers, addUser, deleteUser };