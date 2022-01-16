//const socket  = require('socket.io');
const { Socket } = require('socket.io');



const mazo1 = [{
  name: "warlockk",
  attack: 1,
  defense: 2,
  img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso1.png?alt=media&token=52c53a37-57b4-483e-bd88-d62fc81e7d93",
  state: "activa",
  type: "legendary",
  sellCount: 1,
  sellPrice: 200
},

{
  name: "plover",
  attack: 2,
  defense: 3,
  img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso11.png?alt=media&token=1bf33928-cede-47c1-b12e-f5655c1ae074",
  state: "activa",
  type: "legendary",
  sellCount: 1,
  sellPrice: 500
},

{
  name: "gigadude",
  attack: 3,
  defense: 4,
  img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso12.png?alt=media&token=bc22754b-000d-4e78-995a-5180cfcd54de",
  state: "activa",
  type: "legendary",
  sellCount: 1,
  sellPrice: 300

}]

const mazo2 = [
  {
    name: "octopi",
    attack: 4,
    defense: 5,
    img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso13.png?alt=media&token=2cfce067-415f-4b42-b8bf-0ce667c628a6",
    state: "activa",
    type: "legendary",
    sellCount: 1,
    sellPrice: 400
  },

  {
    name: "ouster",
    attack: 5,
    defense: 6,
    img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso3.png?alt=media&token=edfd5c70-c7c6-4c03-8925-67d66cde53fa",
    state: "activa",
    type: "legendary",
    sellCount: 1,
    sellPrice: 350
  },

  {
    name: "oxonomy",
    attack: 6,
    defense: 7,
    img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso4.png?alt=media&token=fca777ad-267b-4a36-9d60-713ec7f832e0",
    state: "activa",
    type: "epic",
    sellCount: 1,
    sellPrice: 500
  }
]








var connections = [];
let roomincompleto = '';
let room = [];






function ronda(carta1 , carta2){
  if(carta1.mensaje.attack > carta2.mensaje.attack){
    return carta1
  }
  else if(carta2.mensaje.attack > carta1.mensaje.attack){
    return carta2;
  }
  else if(carta2.mensaje.attack === carta1.mensaje.attack){
    return 'empate';
  }
}

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
          socket.join(room[roomincompleto].name)

          room[roomincompleto].jugador2=nombre;
          room[roomincompleto].mazo2=mazo2;
          console.log('estas son las room', room);
          io.sockets.in(room[roomincompleto].name).emit('inicio-partida', roomincompleto , (room[roomincompleto]) );
          socket.emit('turno', true)
          socket.emit('mazo-juego', mazo2)
          roomincompleto = ''


        } else {

          room.push({
            name: `Room de dram`,
            jugador1: nombre,
            mazo1: mazo1,
            jugador2: '',
            mazo2:[]
            
          })
          socket.join(room[room.length-1].name)
          roomincompleto = room.length-1
          socket.emit('mazo-juego', mazo1)

        }
      });

      socket.on('fin-ronda',(mensajes,idpartida)=> {
        console.log('fin de RONDA',mensajes);
        let resultado = ronda(mensajes[0], mensajes[1])
        console.log('resultado ronda',resultado)
        io.sockets.in(room[idpartida].name).emit('resultado', resultado)
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

    socket.on('mensaje', (mensaje, idpartida)=>{

      console.log('mensaje',mensaje)
      io.sockets.in(room[idpartida].name).emit('mensajes',{mensaje});
    })





//----------------------------------------------------------
//Chat
//----------------------------------------------------------
let nombre;

socket.on("conectado", (nomb) => {
  nombre = nomb;
  console.log(nomb)
  //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
  socket.broadcast.emit("mensajeschat", {
    nombre: nombre,
    mensajechat: `${nombre} ha entrado en la sala del chat`,
  });

});

socket.on("mensajechat", (nombre, mensajechat) => {  
  //io.emit manda el mensaje a todos los clientes conectados al chat
  io.sockets.emit("mensajeschat", { nombre, mensajechat });
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