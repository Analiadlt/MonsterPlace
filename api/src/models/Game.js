const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('game', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    idPlayer1: { type: DataTypes.INTEGER }, 
    idPlayer2: { type: DataTypes.INTEGER }, 
    result: { type: DataTypes.ENUM('player1', 'player2', 'tie', ''), defaultValue: '' },
  }
 );
};

