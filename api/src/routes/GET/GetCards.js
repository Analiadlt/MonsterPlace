const { Router } = require("express");
const router = Router();
const { Card } = require("../../db");


const CreateCards = async () => {
  const cards = [
    {
      name: "warlockk",
      attack: 1,
      defense: 2,
      img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bicho%20verde.webp",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 200
    },

    {
      name: "plover",
      attack: 2,
      defense: 3,
      img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichoazul1-1.webp",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 500
    },

    {
      name: "gigadude",
      attack: 3,
      defense: 4,
      img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichoblanco.webp",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 300,
      createdNFT: true
    },

    {
      name: "octopi",
      attack: 4,
      defense: 5,
      img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichomarron1-1.webp",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 400,
      createdNFT: true
    },

    {
      name: "ouster",
      attack: 5,
      defense: 6,
      img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichorojo.webp",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 350,
      createdNFT: true
    },

    {
      name: "oxonomy",
      attack: 6,
      defense: 7,
      img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichorosa-1.webp",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 500
    },
    {
      name: "kerplunk",
      attack: 6,
      defense: 7,
      img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichoverde2-1.webp",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "8",
      attack: 6,
      defense: 7,
      img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichovioleta-1.webp",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 200
    },
    {
      name: "peregrint",
      attack: 6,
      defense: 7,
      img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bolitaceleste.webp",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "succotash",
      attack: 6,
      defense: 7,
      img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bolitavioleta.webp",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 200
    },
  ];
     const hola = await cards.map((g) => Card.create(g));
};
router.get("/get", async (req, res) => {

  try {
    const cards1 = await Card.findAll({
      // attributes: ["id", "name", "attack", "defense", "img", "state", "type", "sellPrice", "orderId"],
    })
    if (cards1.length < 11) {
      CreateCards()
      const allCards = await Card.findAll({
        // attributes: ["id", "name", "attack", "defense", "img", "state", "type", "sellPrice", "orderId"],
      })
      res.status(200).send(allCards)
    }
    else res.status(200).send(cards1)
    
  } catch (error) {
    res.send("Error en la ruta getCard")
  }
})


module.exports = router
