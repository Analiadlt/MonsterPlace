const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('card', {
    name: { type: DataTypes.STRING },
    attack: { type: DataTypes.INTEGER, allowNull: false },
    defense: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false }, //¿qué almacena en img?
    state: { type: DataTypes.ENUM('activa', 'agotada', 'muerta'), allowNull: false }, //¡se puede definir como default 'activa'?
    condition: { type: DataTypes.STRING},
    sellPrice: {type: DataTypes.DECIMAL(20, 2)},
    sellCount: { type: DataTypes.INTEGER, allowNull: false }, //cantidad de Ventas
  }
 );
};

