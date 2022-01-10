const { Router } = require("express");
const router = Router();
const { Card } = require("../../db");
const dataHelper = require("./dataHelper/cardsDataHelper");

const CreateCards = async () => {
  await dataHelper.map((g) => Card.create(g));
};

router.get("/get", async (req, res) => {
  try {
    const cards1 = await Card.findAll({
      attributes: [
        "name",
        "attack",
        "defense",
        "img",
        "state",
        "type",
        "sellPrice",
      ],
    });
    if (cards1.length < 11) {
      CreateCards();
      const allCards = await Card.findAll({
        attributes: [
          "name",
          "attack",
          "defense",
          "img",
          "state",
          "type",
          "sellPrice",
        ],
      });
      res.status(200).send(allCards);
    } else res.status(200).send(cards1);
  } catch (error) {
    res.send("Error en la ruta getCard");
  }
});

module.exports = router;
