// Dependecias necesarias 
const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const {removeExtraSpaces, encrypt} = require('../../recursos/utils');
const respuestas = require('../../red/respuestas');
const controlador = require('./index');

// Middleware express-validator  de validación común para los campos de usuarios
const validarUsuario = [
    body('nombre_usuario').notEmpty().trim().customSanitizer(removeExtraSpaces).isLength({ min: 4, max: 100 }).withMessage('El nombre es requerido y debe tener como máximo 100 caracteres'),
    body('usuario').notEmpty().trim().customSanitizer(removeExtraSpaces).isLength({ min: 4, max: 100 }).withMessage('El nombre del usuario es requerido y debe tener como máximo 100 caracteres'),
    body('direccion_usuario').notEmpty().trim().isLength({ min: 4, max: 255 }).withMessage('La dirección es requerido y debe tener como máximo 100 caracteres'),
    body('telefono_usuario').notEmpty().withMessage('El teléfono es requerido').trim().customSanitizer(removeExtraSpaces).matches(/^(7|6|2)\d{3}-\d{4}$/).withMessage('El teléfono debe tener el formato ####-#### y comenzar con 7, 6 o 2').isLength({ max: 9 }).withMessage('El teléfono debe tener como máximo 9 caracteres'),
    body('email_usuario').notEmpty().withMessage('El correo electrónico no puede estar vacío').trim().customSanitizer(removeExtraSpaces).isEmail().withMessage('El correo electrónico debe ser válido').isLength({ min: 6, max: 100 }).withMessage('El correo electrónico debe tener entre 6 y 100 caracteres'),
    body('fecha_nacimiento').notEmpty().withMessage('La fecha de nacimiento es requerida').trim().matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('La fecha de nacimiento debe tener el formato YYYY-MM-DD').isDate({ format: 'YYYY-MM-DD', strictMode: true }).withMessage('La fecha de nacimiento debe ser una fecha válida en formato YYYY-MM-DD'),
    body('estado_usuario').notEmpty().withMessage('El estado del usuario es requerido').trim().isIn(['Activo', 'Inactivo']).withMessage("El estado del usuario debe ser 'Activo' o 'Inactivo'").default('Activo'),
    body('clave_usuario').notEmpty().trim().customSanitizer(removeExtraSpaces).isLength({ min: 6, max: 300 }).withMessage('La clave es requerida y debe tener al menos 6 caracteres y como máximo 255 caracteres'),
];

// Middleware express-validator de validación para el ID de usuario en la actualización
const validarUsuarioActualizar = [
    body('id_usuario').notEmpty().isInt({ min: 1 }).withMessage('El ID debe ser un número entero mayor que cero')
];

// Middleware de validación y manejo de errores centralizado
function validar(req, res, next) {
    // Manejo de errores
    const errors = validationResult(req);
    // Si hay errores
    if (!errors.isEmpty()) {
        // Respuesta de error
        return respuestas.error(req, res, 'Error en la validación', 401, errors.array());
    }
    next();
}

// Rutas 
router.get('/', obtenerTodos);
router.get('/uno/:id', obtenerUno);
router.post('/agregar', validarUsuario, validar, agregar);
router.put('/actualizar', validarUsuario, validarUsuarioActualizar, actualizar);
router.delete('/eliminar/:id', eliminar);

// Funciones

//Función de obtener todos los usuarios
async function obtenerTodos(req, res, next){
    try {
        // Obtener todos los usuarios
        const items = await controlador.todos();
        // Respuesta exitosa
        respuestas.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
}

//Función de obtener un usuario por su ID
async function obtenerUno(req, res, next){
    try {
        // Obtener el usuario por su ID
        const item = await controlador.uno(req.params.id);
        // Respuesta exitosa
        respuestas.success(req, res, item, 200);
    } catch (error) {
        next(error);
    }
}

//Función de agregar un usuario
async function agregar(req, res, next) {
    try {
        // Encriptar la clave del usuario
        req.body.clave_usuario = await encrypt(req.body.clave_usuario);
        // Agregar el usuario con el evento del controlador
        await controlador.agregar(req.body);
        // Respuesta exitosa
        respuestas.success(req, res, 'Se ha agregado correctamente el usuario', 201);
    } catch (error) {
        // Manejo de errores
        // Si el error es por duplicidad de campos
        if (error.code === 'ER_DUP_ENTRY') {
            // Extraer el nombre del campo duplicado
            const duplicateField = error.sqlMessage.match(/for key '(.+?)'/)[1];
            // Mensaje de error
            const message = `El valor del campo '${duplicateField}' ya existe. Por favor, prueba con otro valor.`;
            // Respuesta de error
            return respuestas.error(req, res, message, 409);
        }
        next(error);
    }
}


//Función de actualizar un usuario
async function actualizar(req, res, next){
    try {
        req.body.clave_usuario = await encrypt(req.body.clave_usuario);
        await controlador.actualizar(req.body);
        respuestas.success(req, res, 'Se ha actualizado correctamente el usuario', 200);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            const duplicateField = error.sqlMessage.match(/for key '(.+?)'/)[1];
            const message = `El valor del campo '${duplicateField}' ya existe. Por favor, prueba con otro valor.`;
            return respuestas.error(req, res, message, 409);
        }
        next(error);
    }
}

//Función de eliminar un usuario
async function eliminar(req, res, next){
    try {
        await controlador.eliminar(req.params.id);
        respuestas.success(req, res, 'Se ha eliminado correctamente al usuario', 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;