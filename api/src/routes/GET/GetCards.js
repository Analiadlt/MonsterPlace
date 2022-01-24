const { Router } = require("express");
const router = Router();
const { Card } = require("../../db");


const CreateCards = async () => {
  const cards = [
    {
      name: "warlockk",
      attack: 1,
      defense: 2,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recursos%2Fbicho%20verde.png?alt=media&token=4106ed79-77d4-4428-bcc1-07b289e08fd3",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 200
    },

    {
      name: "plover",
      attack: 2,
      defense: 3,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recursos%2Fbichoazul1.png?alt=media&token=f4c838b7-aaca-4bbf-a2c2-cf5ea3dcb58b",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 500
    },

    {
      name: "gigadude",
      attack: 3,
      defense: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recursos%2Fbichoblanco.png?alt=media&token=ff92a28d-fe54-4af6-b2ed-35d9cf1111ac",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 300
    },

    {
      name: "octopi",
      attack: 4,
      defense: 5,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recursos%2Fbichomarron1.png?alt=media&token=1b9cb4db-e890-490d-96b9-32fec280304a",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 400
    },

    {
      name: "ouster",
      attack: 5,
      defense: 6,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recursos%2Fbichorojo.png?alt=media&token=836cd22e-db59-464c-bb2a-f96a26b89237",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 350
    },

    {
      name: "oxonomy",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recursos%2Fbichorosa.png?alt=media&token=f2f7e559-f171-4c0e-89db-e86b660fd709",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 500
    },
    {
      name: "kerplunk",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recursos%2Fbichoverde2.png?alt=media&token=461cb170-bbd5-4a38-9d4f-c10bb4bf67ea",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "8",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recursos%2Fbichovioleta.png?alt=media&token=b0c9b73c-02fd-4420-b442-313cd0c8bf69",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 200
    },
    {
      name: "peregrint",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recursos%2Fbolitaceleste.png?alt=media&token=2c06e2ce-2f10-4ee2-a003-121b73ceaaaf",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "succotash",
      attack: 6,
      defense: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recursos%2Fbolitavioleta.png?alt=media&token=fecd0dba-0bd5-4dcb-88c3-36bd203be562",
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
      attributes: ["id", "name", "attack", "defense", "img", "state", "type", "sellPrice", "orderId"],
    })
    if (cards1.length < 11) {
      CreateCards()
      const allCards = await Card.findAll({
        attributes: ["id", "name", "attack", "defense", "img", "state", "type", "sellPrice", "orderId"],
      })
      res.status(200).send(allCards)
    }
    else res.status(200).send(cards1)
    
  } catch (error) {
    res.send("Error en la ruta getCard")
  }
})


module.exports = router
