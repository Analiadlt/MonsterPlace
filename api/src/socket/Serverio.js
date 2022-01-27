//const socket  = require('socket.io');
const { Socket } = require('socket.io');



// const mazo1 = [{
//   name: "warlockk",
//   attack: 10,
//   defense: 20,
//   img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso1.png?alt=media&token=52c53a37-57b4-483e-bd88-d62fc81e7d93",
//   state: "activa",
//   type: "legendary",
//   sellCount: 1,
//   sellPrice: 200
// },

// {
//   name: "plover",
//   attack: 30,
//   defense: 15,
//   img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso11.png?alt=media&token=1bf33928-cede-47c1-b12e-f5655c1ae074",
//   state: "activa",
//   type: "legendary",
//   sellCount: 1,
//   sellPrice: 500
// },

// {
//   name: "gigadude",
//   attack: 70,
//   defense: 40,
//   img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso12.png?alt=media&token=bc22754b-000d-4e78-995a-5180cfcd54de",
//   state: "activa",
//   type: "legendary",
//   sellCount: 1,
//   sellPrice: 300

// }]

// const mazo2 = [
//   {
//     name: "octopi",
//     attack: 90,
//     defense: 50,
//     img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso13.png?alt=media&token=2cfce067-415f-4b42-b8bf-0ce667c628a6",
//     state: "activa",
//     type: "legendary",
//     sellCount: 1,
//     sellPrice: 400
//   },

//   {
//     name: "ouster",
//     attack: 20,
//     defense: 20,
//     img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso3.png?alt=media&token=edfd5c70-c7c6-4c03-8925-67d66cde53fa",
//     state: "activa",
//     type: "legendary",
//     sellCount: 1,
//     sellPrice: 350
//   },

//   {
//     name: "oxonomy",
//     attack: 50,
//     defense: 70,
//     img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso4.png?alt=media&token=fca777ad-267b-4a36-9d60-713ec7f832e0",
//     state: "activa",
//     type: "epic",
//     sellCount: 1,
//     sellPrice: 500
//   }
// ]







var connections = [];
let roomincompleto = '';
let room = [];
let usu = 0;
let socketInfo = {
  socketId: '',
  socketNickName: ''
};
let arrSocket = [];


let diferencia

// function ronda(cartaJugador2 , cartaJugador1){
//   if(cartaJugador2.mensaje.attack > cartaJugador1.mensaje.attack){
//     diferencia = cartaJugador2.mensaje.attack - cartaJugador1.mensaje.attack
//     cartaJugador2.restarvida1 = diferencia
    
//     return cartaJugador2
//   }
//   else if(cartaJugador1.mensaje.attack > cartaJugador2.mensaje.attack){
//     diferencia = cartaJugador1.mensaje.attack - cartaJugador2.mensaje.attack
//     cartaJugador1.restarvida2 = diferencia
    
//     return cartaJugador1;
//   }
//   else if(cartaJugador1.mensaje.attack === cartaJugador2.mensaje.attack){
//     return 'empate';
//   }
// }

//-----------------logica

var cardGame = (carta1, carta2) => {
  if (carta1.mensaje.attack > carta2.mensaje.defense) {
      const difPower2 = carta1.mensaje.attack - carta2.mensaje.defense
      carta1.mensaje.restarvida2 = difPower2
      return  carta1 
  }
  else if (carta2.mensaje.attack > carta1.mensaje.defense) {
      const difPower1 = carta2.mensaje.attack - carta1.mensaje.defense
      carta2.mensaje.restarvida1 = difPower1
      return carta2 
  }
  else if(carta1.mensaje.attack > carta2.mensaje.attack) {
      const difPower2 = carta1.mensaje.attack - carta2.mensaje.attack
      carta1.mensaje.restarvida2 = difPower2
      return  carta1 
  }
  else if(carta2.mensaje.attack > carta1.mensaje.attack) {
      const difPower1 = carta2.mensaje.attack - carta1.mensaje.attack
      carta2.mensaje.restarvida1 = difPower1
      return  carta2 
  }

  else {
      return "empate"
  }
}

//----------------------

let ServerIo = (http)=>{

const io = require('socket.io')(http,{

    cors:{
        origin:'*',
    },

});




//apertura del socket
io.on('connection', socket =>{

socket.onAny((event, ...args) => {
  console.log(event, args);
});

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
          if(room[roomincompleto].jugador1 !== nombre){
            socket.join(room[roomincompleto].name)
            room[roomincompleto].jugador2=nombre;
            // room[roomincompleto].mazo2=mazo2;
            console.log('estas son las room', room);
            socket.emit('room', roomincompleto,'jugador2')
            io.sockets.in(room[roomincompleto].name).emit('inicio-partida', roomincompleto , (room[roomincompleto]) );
            socket.emit('turno', true)
            // socket.emit('mazo-juego', mazo2)
            roomincompleto = ''
          }
        } else {

          room.push({
            name: `Room de ${nombre}`,
            jugador1: nombre,
            // mazo1: mazo1,
            jugador2: '',
            // mazo2:[]
            
          })
          socket.join(room[room.length-1].name)
          roomincompleto = room.length-1
          // socket.emit('mazo-juego', mazo1)
          socket.emit('room', roomincompleto,'jugador1')

        }
      });
      socket.on('cancelar-busqueda',(idpartida)=> {
        socket.leave(room[idpartida].name)
        console.log(room, roomincompleto)
        roomincompleto = '';

      })
      socket.on('usuario-dentro',(idpartida)=> {
        usu += 1;
        console.log('usuarios en sala',usu)
        if(usu === 2){
          io.sockets.in(room[idpartida].name).emit('jugadores-listos')
          usu = 0;
        }

      })

      socket.on('fin-ronda',(mensajes,idpartida)=> {
        console.log('fin de RONDA',mensajes);
        let resultado = cardGame(mensajes[1], mensajes[0])
        console.log('resultado ronda',resultado)
        io.sockets.in(room[idpartida].name).emit('resultado', resultado)
      })
      socket.on('fin-partida',(idpartida)=> {
        socket.leave(room[idpartida].name)
      })

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


    socket.on('mensaje', (mensaje, idpartida, enviarMensaje,perdedor)=>{

      console.log('mensaje...',mensaje)
      console.log('bule...',enviarMensaje)

      io.sockets.in(room[idpartida].name).emit('mensajes',{mensaje},enviarMensaje,perdedor);
    })





//----------------------------------------------------------
//Chat
//----------------------------------------------------------
let nombre;
var clients = [ ];
socket.on("conectado", (nomb) => {
  nombre = nomb;
  console.log(nomb)
  //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
  socket.broadcast.emit("mensajeschat", {
    nombre: nombre,
    mensajechat: `${nombre} ha entrado en la sala del chat`,
  });
  
  socketInfo = ({
  socketId: socket.id,
  socketNickName: nombre
  }) 
 
clients.push(socketInfo);
console.log("Clientes: ", clients);
console.log("arrSocket: ", arrSocket);
});




 
// const userslist = io.of("/nomb").on("connection", (socket) => {	
//   socket.on("nombre:list", () => {}
//   );  //lista de usuarios)
//   socket.on("nombre:add", (nombre) => {
//     socket.broadcast.emit("nombre:add", nombre);
//   });
// });
// console.log("Lista de usuarios: ",userslist);





socket.on("mensajechat", (nombre, mensajechat) => {  
  //io.emit manda el mensaje a todos los clientes conectados al chat
  console.log('este si ',nombre, mensajechat)
  io.emit("mensajeschat",  {nombre, mensajechat} );
});

socket.on("disconnect", () => {
  io.emit("mensajeschat", {
    servidor: "Servidor",
    mensajechat: `${nombre} ha abandonado la sala`,
  });
});


//----------------------------------------------------------
})

}



module.exports = ServerIo;