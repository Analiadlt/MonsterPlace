const { Router } = require("express");
const router = Router();
const { Card } = require("../../db");


const CreateCards = async () => {
  const cards = [
    {
      name: "1",
      attack: 1,
      defense: 2,
      img: "imagen",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },

    {
      name: "2",
      attack: 2,
      defense: 3,
      img: "imagen",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },

    {
      name: "3",
      attack: 3,
      defense: 4,
      img: "imagen",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },

    {
      name: "4",
      attack: 4,
      defense: 5,
      img: "imagen",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },

    {
      name: "5",
      attack: 5,
      defense: 6,
      img: "imagen",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },

    {
      name: "6",
      attack: 6,
      defense: 7,
      img: "imagen",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },
  ];
     const hola = await cards.map((g) => Card.create(g));
};
//acá tenemos la ruta. CreateCards() esta solo para que tengamos una base de datos base.
router.get("/get", async (req, res) => {
  try {
     CreateCards();
    const allCards = await Card.findAll({
      attributes: ["attack", "defense", "img", "state", "condition"],
    });

    return res.status(200).send(allCards);
  } catch (e) {
    res.status(404).send("Cant access DB. GET CARDS PROBLEMS");
  
  }
});

module.exports = router;