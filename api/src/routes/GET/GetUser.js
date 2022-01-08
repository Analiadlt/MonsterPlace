const express = require("express");
const { User } = require("../../db");
const server = express();

server.get("/", async (req, res) => {
  const allUsers = await User.findAll();
  const nickName = req.query.nickName;

  try {
    if (nickName) {
      const userByNickName = allUsers.filter((index) =>
        index.nickName.toLowerCase().includes(nickName.toLowerCase())
      );
      if (userByNickName.length > 0) res.json(userByNickName);
      else res.send([{ error: "no se encontraron coincidencias" }]);
    } else res.json(allUsers);
  } catch (error) {
    res.send("Error en la base de datos");
  }
});

server.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      const userID = await User.findOne({
        where: {
          id: id,
        },
      });
      if (userID.length !== 0) res.json(userID);
      else res.send([{ error: "El ID del usuario no existe" }]);
    } else res.json(allUsers);
  } catch (error) {
    res.status(400).send("Error en la base de datos");
  }
});

module.exports = server;
