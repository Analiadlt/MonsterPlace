const express = require("express");
const { User, Card } = require("../../db");
const server = express();

server.put("/", async (req, res) => {
  const { email, nftContract } = req.body;
   try {
    const user = await User.findOne({ where: { email: email }});
    const cards = await Card.findAll({ where: { nftContract: nftContract }});
    if (!user) {
      res.status(400).send("No existe el usuario");
    }
    if (!cards) {
      res.status(400).send("No existe la carta solicitada");
    } else if (user && cards) {
      user.addCards(cards);
      res.send("Carta agregadas satifactoriamente");
    }
  } catch (error) {
    res.send("Error en la base de datos");
  }
});

module.exports = server;
