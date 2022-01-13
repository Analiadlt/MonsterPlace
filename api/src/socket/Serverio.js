var connections = [];

let ServerIo = (http)=>{

const io = require('socket.io')(http,{

    cors:{
        origin:'*',
    },

});



// contar los sockets abiertos
function getCounter(){
	io.sockets.emit('getCounter',connections.length);
	console.log("Conexiones a Socket Nro: ", connections.length);
}

//apertura del socket
io.on('connection', socket =>{

    // contador de sockets
    connections.push(socket);
    getCounter();
    console.log("New Socket connected: ", socket.id);
    
    // controlador del chat
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



module.exports = ServerIo;