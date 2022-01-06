const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    email: { type: DataTypes.STRING, allowNull: false, validate: {isEmail: true,} },
    firstName: { type: DataTypes.STRING, allowNull: false,},
    lastName: { type: DataTypes.STRING, allowNull: false,},
    nickName: { type: DataTypes.STRING, allowNull: false,},
    dateBirth: { type: DataTypes.DATEONLY, allowNull: false,}, 
    password: { type: DataTypes.STRING, allowNull: false, },
    token: { type: DataTypes.STRING, allowNull: false,},
    rol: { type: DataTypes.INTEGER, default: 0 }, // vale 1-usuario logueado y confirmado - 2- administrador
  },
 );
};
