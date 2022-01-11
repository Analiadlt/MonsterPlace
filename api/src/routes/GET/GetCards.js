const { Router } = require("express");
const router = Router();
const { Card } = require("../../db");


const CreateCards = async () => {
  const cards = [
    {
      name: "warlockk",
      attack: 1,
      defense: 2,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso1.png?alt=media&token=52c53a37-57b4-483e-bd88-d62fc81e7d93",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 200
    },

    {
      name: "plover",
      attack: 2,
      defense: 3,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso11.png?alt=media&token=1bf33928-cede-47c1-b12e-f5655c1ae074",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 500
    },

    {
      name: "gigadude",
      attack: 3,
      defense: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso12.png?alt=media&token=bc22754b-000d-4e78-995a-5180cfcd54de",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 300
    },

    {
      name: "octopi",
      attack: 4,
      defense: 5,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso13.png?alt=media&token=2cfce067-415f-4b42-b8bf-0ce667c628a6",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 400
    },

    {
      name: "ouster",
      attack: 5,
      defense: 6,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso3.png?alt=media&token=edfd5c70-c7c6-4c03-8925-67d66cde53fa",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 350
    },

    {
      name: "oxonomy",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso4.png?alt=media&token=fca777ad-267b-4a36-9d60-713ec7f832e0",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 500
    },
    {
      name: "kerplunk",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso5.png?alt=media&token=888599c3-66cb-4a98-a891-a6150edc44e5",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "8",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso6.png?alt=media&token=58361beb-fe19-42eb-a7f3-804ceb441a6f",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 200
    },
    {
      name: "9",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso7.png?alt=media&token=d3828400-c339-4502-a31f-fdf19a2eeeee",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "succotash",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso8.png?alt=media&token=19db0f57-827c-46b4-a0fa-2f34ff0d30bc",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 200
    },
    {
      name: "peregrint",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso9.png?alt=media&token=76090ee8-42ad-496e-82c1-a1d17d811167",
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
