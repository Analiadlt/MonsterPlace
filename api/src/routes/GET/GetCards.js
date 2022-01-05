const { Router } = require("express");
const router = Router();
const { Card } = require("../db");

router.get("/", async (req, res) => {
  try {
      const allCards = await Card.findAll({
      attributes: ["attack", "defense", "img", "state", "condition", "sellPrice"],
    });

    return res.status(200).send(allCards);


  } catch (e) {
    res.status(404).send("Cant access DB. GET CARDS PROBLEMS");
  }
});
