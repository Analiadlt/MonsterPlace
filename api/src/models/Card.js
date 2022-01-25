const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('card', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: { type: DataTypes.STRING },
    attack: { type: DataTypes.INTEGER, allowNull: false },
    defense: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false }, 
    // state: { type: DataTypes.ENUM('activa', 'agotada', 'muerta'), allowNull: true},
    type: { type: DataTypes.STRING},
    sellPrice: {type: DataTypes.DECIMAL(20, 2)},
    sellCount: { type: DataTypes.INTEGER }, //cantidad de Ventas
    currency: {type: DataTypes.STRING,  defaultValue: 'ARS'},
    nftContract: { type: DataTypes.STRING},
    createdNFT: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  }
 );
};

// currency: Identificador de la moneda utilizada en el pago
// ARS: Peso argentino.
// BRL: Real brasilero.
// CLP: Peso chileno.
// MXN: Peso mexicano.
// COP: Peso colombiano.
// PEN: Sol peruano.
// UYU: Peso uruguayo.
