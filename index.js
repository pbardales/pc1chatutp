const path = require('path');
const express = require('express');
const app = express();

//Configuracion
app.set('port', process.env.PORT || 3000);

//Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Inicializar nuestro servidor
const server = app.listen(app.get('port'), () => {
    console.log('El servidor esta en el puerto', app.get('port'));
});

//WebSockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('Nueva conexion', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
})





