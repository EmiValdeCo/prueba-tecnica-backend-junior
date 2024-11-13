// funciones de repuestas de exito y errores  
// Función para manejar las respuestas exitosas
exports.success = function(req, res, mensaje = '', status = 200) {
    // Respuesta
    res.status(status).json({
        success: true,
        status: status,
        data: mensaje
    });
}
// Función para manejar los errores
exports.error = function(req, res, mensaje, status, detalles) {
    // Valores por defecto
    status = (typeof status === 'undefined') ? 500 : status;
    mensaje = (typeof mensaje === 'undefined') ? 'Error interno del servidor' : mensaje;
    // Respuesta
    res.status(status).json({
        success: false,
        status: status,
        error:  mensaje,
        detalles: detalles
    });
};

