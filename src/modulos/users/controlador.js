// Campos de valores de las tablas 
const TABLE_NAME = 'tb_usuarios';
const ID_FIELD = 'id_usuario';

module.exports = function (db) {
    // Funcion de obtener todos los usuarios
    async function todos() {
        return db.todos(TABLE_NAME);
    }
    // Funcion de obtener un usuario por su ID
    async function uno(id) {
        return db.uno(TABLE_NAME, id, ID_FIELD);
    }
    // Funcion de agregar un usuario
    async function agregar(data) {
        return db.agregar(TABLE_NAME, data);
    }
    // Funcion de actualizar un usuario
    async function actualizar(data) {
        const { id_usuario, ...restoDatos } = data;
        return db.actualizar(TABLE_NAME, restoDatos, ID_FIELD, id_usuario);
    }
    // Funcion de eliminar un usuario
    async function eliminar(id) {
        return db.eliminar(TABLE_NAME, id, ID_FIELD);
    }
    // Retornar las funciones
    return {
        todos,
        uno, 
        agregar,
        actualizar,
        eliminar,
    };
};