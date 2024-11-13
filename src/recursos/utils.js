// Funciones útiles para el proyecto
const bcrypt = require('bcryptjs'); 

// Función para remover espacios extras
const removeExtraSpaces = (value) => {
    return value.replace(/\s+/g, ' ').trim();
};

// Función para encriptar
const encrypt = async (value) => {
    // Generar un salt para encriptar 10 veces
    const salt = await bcrypt.genSalt(10);
    // Encriptar el valor con el salt y se retorna
    return await bcrypt.hash(value, salt);
};

module.exports = {
    removeExtraSpaces,
    encrypt,
};
