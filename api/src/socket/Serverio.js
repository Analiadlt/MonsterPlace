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
    // connections.push(socket);

    getCounter();
    console.log("New Socket connected: ", socket.id);
    //Meto el socket.id en el array de conexiones
    if (socket.id !== false) {
        connections.push(socket.id);
      }

    // contar los sockets abiertos
    function getCounter(){
        io.sockets.emit('getCounter',connections.length);
        console.log("Total Conexiones ", connections.length);
    }  

    //envio cantidad de conexiones al front
   socket.emit('Conexiones',connections.length);
   socket.emit('Socketid',socket.id);
   socket.on ('message', (men)=>{
     console.log("Mensaje de Alerta: ", men)}

    )
    // controlador del chat
    // let nombre;
    // socket.on('conectado',(nomb)=>{
    //     nombre = nomb;
    //     socket.broadcast.emit('mensajes',{nombre: nombre , mensaje: `${nombre} Ha entrado en la sala`});
    // })

    socket.on('mensaje', (nombre,mensaje)=>{
        io.emit('mensajes',{nombre,mensaje});
    })

    // socket.on('disconnect', ()=>{
    //     io.emit('mensajes', {server: 'Servidor', mensaje: `${nombre} abandonado la sala`})
    // })


//---------------------------------------------------------------------------------------
// Encontrar un jugador disponible
  let playerIndex = -1;
  for (let i = 0; i < connections.length; i++) {
    
      playerIndex = i
    
  }

  // Avisar al cliente conectado que numero de jugador hay 
  socket.emit('player-number', playerIndex)

  console.log(`Jugador ${playerIndex} esta conectado`)

  // Ignore player 3
  if (playerIndex > 1) return

  connections[playerIndex] = false

  // Decir a todos que jugador esta conectado
  socket.broadcast.emit('player-connection', playerIndex)

  // Handle Diconnect
  socket.on('disconnect', () => {
    console.log(`Player ${playerIndex} disconnected`)
    connections[playerIndex] = null
    //Tell everyone what player numbe just disconnected
    socket.broadcast.emit('player-connection', playerIndex)
  })


})

}



module.exports = ServerIo;