const express = require("express");
const { User } = require("../../db");
const server = express();
const dataHelper = require("./dataHelper/userDataHelper")

// const allUsers = async () => {
//   const infoCreate = dataHelper.map(index => {
//     return {
//       email: index.email,
//       firstName: index.firstName,
//       lastName: index.lastName,
//       nickName: index.nickName,
//       dateBirth: index.dateBirth,
//       password: index.password
//     }
//   })
//   const infoDataBase = await User.bulkCreate(infoCreate)
//   return infoDataBase
// }

server.get("/", async (req, res) => {
  try {
    const usuario = await User.findAll()
    // if (usuario.length < 5 ) {
      // allUsers()
      const allUser = await User.findAll()
        res.status(200).send(allUser)
    // }
    // else res.status(200). send(usuario)
        

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