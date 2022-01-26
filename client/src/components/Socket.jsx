import io from 'socket.io-client';
require('dotenv').config();

// let socket = io('https://pfcryptogame.herokuapp.com');
let socket = io(process.env.REACT_APP_API || "http://localhost:3001");


export default socket