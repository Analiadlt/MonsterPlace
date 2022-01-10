const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('user', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    email: { type: DataTypes.STRING, allowNull: false, validate: {isEmail: true,} },
    firstName: { type: DataTypes.STRING, allowNull: false,},
    lastName: { type: DataTypes.STRING, allowNull: false,},
    nickName: { type: DataTypes.STRING, allowNull: false,},
    dateBirth: { type: DataTypes.DATEONLY, allowNull: true,}, 
    password: { type: DataTypes.STRING, allowNull: false, },
    //token: { type: DataTypes.STRING, allowNull: false,},
    token: { type: DataTypes.STRING,},
    rol: { type: DataTypes.INTEGER, default: 0 }, // vale 1-usuario logueado y confirmado - 2- administrador
  },
 );
};
