const app = require('./app');
// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor escuchado en el puerto', app.get('port')); 
}); 