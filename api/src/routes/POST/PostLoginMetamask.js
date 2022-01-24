const express = require("express");
const { User } = require("../../db");

const server = express();

server.post("/", async (req, res) => {
  const { metamaskAccount } = req.body;
  try {
    const user = await User.findOne({
      where: { metamaskAccount: metamaskAccount },
    });
    if (!user) {
      res.status(400).send("Usuario inexistente");
    } else {
      console.log("datos de usuario login metamask:", user.dataValues);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).send("error en la ruta PostLoginMetamask", error);
  }
});

module.exports = server;
