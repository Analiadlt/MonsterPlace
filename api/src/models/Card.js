const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("card", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    attack: { type: DataTypes.INTEGER, allowNull: false },
    defense: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false }, 
    state: {
      type: DataTypes.ENUM("activa", "agotada", "muerta"),
      allowNull: false,
    }, 
    type: { type: DataTypes.STRING },
    sellPrice: { type: DataTypes.DECIMAL(20, 2) },
    sellCount: { type: DataTypes.INTEGER, allowNull: false }, 
  });
};
