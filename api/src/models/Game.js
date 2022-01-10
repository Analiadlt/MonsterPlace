const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("game", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    idPlayer1: { type: DataTypes.INTEGER },
    idPlayer2: { type: DataTypes.INTEGER },
    result: {
      type: DataTypes.ENUM("player1", "player2", "tie", ""),
      defaultValue: "",
    },
  });
};
