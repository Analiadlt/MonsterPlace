const { Router } = require("express");
const router = Router();
const { Card } = require("../../db");


const CreateCards = async () => {
  const cards = [
    {
      name: "warlockk",
      attack: 1,
      defense: 2,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-2-74257.appspot.com/o/recursos%2Fbicho%20verde.png?alt=media&token=d1cf39da-b453-4c01-b1e6-c705434263f7",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 200
    },

    {
      name: "plover",
      attack: 2,
      defense: 3,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-2-74257.appspot.com/o/recursos%2Fbichoazul1.png?alt=media&token=9f5c9e5c-1a3b-428c-a491-a97dbda2a466",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 500
    },

    {
      name: "gigadude",
      attack: 3,
      defense: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-2-74257.appspot.com/o/recursos%2Fbichoblanco.png?alt=media&token=2e9f9c50-de42-498b-a19a-91e3648cc7ab",
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
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-2-74257.appspot.com/o/recursos%2Fbichomarron1.png?alt=media&token=52f04413-469c-4b6e-85c9-6131ff8d4520",
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
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-2-74257.appspot.com/o/recursos%2Fbichorojo.png?alt=media&token=8429f55e-538f-4c8a-8eda-9d4236f240ae",
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
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-2-74257.appspot.com/o/recursos%2Fbichorosa.png?alt=media&token=f3c3bd8d-1d5e-41eb-b348-ea1b6578cb68",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 500
    },
    {
      name: "kerplunk",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-2-74257.appspot.com/o/recursos%2Fbichoverde2.png?alt=media&token=779e4612-d936-40fa-81a8-1c2095289abe",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "8",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-2-74257.appspot.com/o/recursos%2Fbichovioleta.png?alt=media&token=edfdaf60-8c24-493b-b73b-7b6c66723ceb",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 200
    },
    {
      name: "peregrint",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-2-74257.appspot.com/o/recursos%2Fbolitaceleste.png?alt=media&token=8c1d25b1-0e79-4a84-ae1e-2780dc559ef0",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "succotash",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-2-74257.appspot.com/o/recursos%2Fbolitavioleta.png?alt=media&token=090b6688-b35e-4ac8-b4f0-235a05df1819",
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
