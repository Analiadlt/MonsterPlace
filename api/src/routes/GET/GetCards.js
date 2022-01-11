const { Router } = require("express");
const router = Router();
const { Card } = require("../../db");


const CreateCards = async () => {
  const cards = [
    {
      name: "warlockk",
      attack: 1,
      defense: 2,
      img: "gs://proyecto-final-47802.appspot.com/recurso1.png",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 200
    },

    {
      name: "plover",
      attack: 2,
      defense: 3,
      img: "gs://proyecto-final-47802.appspot.com/recurso11.png ",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 500
    },

    {
      name: "gigadude",
      attack: 3,
      defense: 4,
      img: "gs://proyecto-final-47802.appspot.com/recurso12.png",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 300
    },

    {
      name: "octopi",
      attack: 4,
      defense: 5,
      img: "gs://proyecto-final-47802.appspot.com/recurso13.png",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 400
    },

    {
      name: "ouster",
      attack: 5,
      defense: 6,
      img: "gs://proyecto-final-47802.appspot.com/recurso3.png",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 350
    },

    {
      name: "oxonomy",
      attack: 6,
      defense: 7,
      img: "gs://proyecto-final-47802.appspot.com/recurso4.png",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 500
    },
    {
      name: "kerplunk",
      attack: 6,
      defense: 7,
      img: "gs://proyecto-final-47802.appspot.com/recurso5.png",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "8",
      attack: 6,
      defense: 7,
      img: "gs://proyecto-final-47802.appspot.com/recurso6.png",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 200
    },
    {
      name: "9",
      attack: 6,
      defense: 7,
      img: "gs://proyecto-final-47802.appspot.com/recurso7.png",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "succotash",
      attack: 6,
      defense: 7,
      img: "gs://proyecto-final-47802.appspot.com/recurso8.png",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 200
    },
    {
      name: "peregrint",
      attack: 6,
      defense: 7,
      img: "gs://proyecto-final-47802.appspot.com/recurso9.png",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 300
    },
  ];
     const hola = await cards.map((g) => Card.create(g));
};
router.get("/get", async (req, res) => {

  try {
    const cards1 = await Card.findAll({
      attributes: ["name", "attack", "defense", "img", "state", "type", "sellPrice"],
    })
    if (cards1.length < 11) {
      CreateCards()
      const allCards = await Card.findAll({
        attributes: ["name", "attack", "defense", "img", "state", "type", "sellPrice"],
      })
      res.status(200).send(allCards)
    }
    else res.status(200).send(cards1)
    
  } catch (error) {
    res.send("Error en la ruta getCard")
  }
})


module.exports = router
