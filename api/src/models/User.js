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
    userName: { type: DataTypes.STRING, allowNull: false,},
    nickName: { type: DataTypes.STRING, allowNull: false,},
    dateBirth: { type: DataTypes.DATEONLY, allowNull: false,}, //validar que sea mayor a 18 años
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
      this.setDataValue('password', hash(this.userName + value)); //ver qué hash usar
      }
      },
    token: { type: DataTypes.STRING, allowNull: false,}, //ver este atributo!
  },
 );
};

