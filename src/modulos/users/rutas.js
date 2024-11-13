// Dependecias necesarias 
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const respuestas = require('../../red/respuestas');
const controlador = require('./index');

// Rutas 
router.get('/', obtenerTodos);
router.get('/uno/:id', obtenerUno);
router.post('/agregar', agregar);
router.put('/actualizar', actualizar);
router.delete('/eliminar/:id', eliminar);

// Funciones

//Función de obtener todos los usuarios
async function obtenerTodos(req, res, next){
    try {
        const items = await controlador.todos();
        respuestas.success(req, res, items, 200);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//Función de obtener un usuario por su ID
async function obtenerUno(req, res, next){
    try {
        const item = await controlador.uno(req.params.id);
        respuestas.success(req, res, item, 200);
    } catch (error) {
        next(error);
    }
}

//Función de agregar un usuario
async function agregar(req, res, next){
    try {
        const item = await controlador.agregar(req.body);
        respuestas.success(req, res, item, 201);
    } catch (error) {
        next(error);
    }
}

//Función de actualizar un usuario
async function actualizar(req, res, next){
    try {
        const item = await controlador.actualizar(req.body);
        respuestas.success(req, res, item, 200);
    } catch (error) {
        next(error);
    }
}

//Función de eliminar un usuario
async function eliminar(req, res, next){
    try {
        const item = await controlador.eliminar(req.params.id);
        respuestas.success(req, res, item, 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;