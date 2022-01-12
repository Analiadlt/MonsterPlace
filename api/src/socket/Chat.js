let Chat = (http)=>{

const io = require('socket.io')(http,{

    cors:{
        origin:'*',
    },

});

io.on('connection', socket =>{
    let nombre;
    socket.on('conectado',(nomb)=>{
        nombre = nomb;
        socket.broadcast.emit('mensajes',{nombre: nombre , mensaje: `${nombre} Ha entrado en la sala`});
    })

    socket.on('mensaje', (nombre,mensaje)=>{
        io.emit('mensajes',{nombre,mensaje});
    })

    socket.on('disconnect', ()=>{
        io.emit('mensajes', {server: 'Servidor', mensaje: `${nombre} abandonado la sala`})
    })

})

}

module.exports = Chat;