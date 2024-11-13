// Solicita las dependencias necesarias para el funcionamiento del servidor
const express = require('express');
const config = require('./config');
const error = require('./red/errors'); 

// Modulo de rutas
const users = require('./modulos/users/rutas');

const app = express();

// Configuración del puerto
app.set('port', config.app.port);

// Middleware para interpretar JSON
app.use(express.json()); 

// Rutas
app.use('/api/usuarios', users);

// Manejo de errores
app.use(error); 

module.exports = app;