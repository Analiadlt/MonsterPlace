const { Socket } = require('socket.io');

var connections = [];
let roomincompleto = '';
let room = [];

let ServerIo = (http)=>{

const io = require('socket.io')(http,{

    cors:{
        origin:'*',
    },

});




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

      //Buscar rooms
      
      socket.on('buscar-rooms', (nombre)=>{
        console.log("buscar-rooms");
        if(roomincompleto !== '') {
/*           roomincompleto.push(nombre);
          room.push(roomincompleto);
          console.log("RoomInconpleto antes de enviar: ", roomincompleto, room.length-1)
          io.sockets.emit('inicio-partida', roomincompleto, (room.length-1) );
          roomincompleto = [];
          console.log('roomincompleto: ', roomincompleto, 'room: ', room); */
          socket.join(room[roomincompleto])
          console.log('estas son las room', room);
          io.sockets.in(room[roomincompleto]).emit('inicio-partida', roomincompleto );
          roomincompleto = ''


        } else {
/*           roomincompleto.push(nombre);
          socket.join(nombre);
          console.log('roomincompleto: ', roomincompleto, 'room: ', room); */
          room.push(`room de ${nombre}`)
          socket.join(room[room.length-1])
          roomincompleto = room.length-1

        }
      });

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

    socket.on('mensaje', (mensaje, idpartida)=>{
      io.sockets.in(room[idpartida]).emit('mensajes',{mensaje});
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