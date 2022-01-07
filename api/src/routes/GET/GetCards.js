const { Router } = require("express");
const router = Router();
const { Card } = require("../../db");


const CreateCards = async () => {
  const cards = [
    {
      name: "1",
      attack: 1,
      defense: 2,
      img: "https://github.com/Analiadlt/PF/blob/Development/client/src/img/recurso1.png",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },

    {
      name: "2",
      attack: 2,
      defense: 3,
      img: "https://github.com/Analiadlt/PF/blob/Development/client/src/img/recurso11.png",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },

    {
      name: "3",
      attack: 3,
      defense: 4,
      img: "https://github.com/Analiadlt/PF/blob/Development/client/src/img/recurso12.png",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },

    {
      name: "4",
      attack: 4,
      defense: 5,
      img: "https://github.com/Analiadlt/PF/blob/Development/client/src/img/recurso13.png",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },

    {
      name: "5",
      attack: 5,
      defense: 6,
      img: "https://github.com/Analiadlt/PF/blob/Development/client/src/img/recurso3.png",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },

    {
      name: "6",
      attack: 6,
      defense: 7,
      img: "https://github.com/Analiadlt/PF/blob/Development/client/src/img/recurso4.png",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },
    {
      name: "7",
      attack: 6,
      defense: 7,
      img: "https://github.com/Analiadlt/PF/blob/Development/client/src/img/recurso5.png",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },
    {
      name: "8",
      attack: 6,
      defense: 7,
      img: "https://github.com/Analiadlt/PF/blob/Development/client/src/img/recurso6.png",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },
    {
      name: "9",
      attack: 6,
      defense: 7,
      img: "https://github.com/Analiadlt/PF/blob/Development/client/src/img/recurso7.png",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },
    {
      name: "10",
      attack: 6,
      defense: 7,
      img: "https://github.com/Analiadlt/PF/blob/Development/client/src/img/recurso8.png",
      state: "activa",
      condition: "fuego",
      sellCount: 1,
    },
    {
      name: "11",
      attack: 6,
      defense: 7,
      img: "https://github.com/Analiadlt/PF/blob/Development/client/src/img/recurso9.png",
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
