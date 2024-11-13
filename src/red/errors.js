const respuestas = require('./respuestas'); 

// Función para manejar los errores
function errors(err, req, res, next) {
    const mensaje = err.mensaje || 'Error interno'; 
    const status = err.statusCode || 500; 

    respuestas.error(req, res, mensaje, status); 
}

module.exports = errors; 