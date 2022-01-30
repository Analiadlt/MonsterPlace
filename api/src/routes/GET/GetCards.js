const { Router } = require("express");
const router = Router();
const { Card } = require("../../db");


const CreateCards = async () => {
  // const cards = [
  //   {
  //     name: "warlockk",
  //     attack: 1,
  //     defense: 2,
  //     img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bicho%20verde.webp",
  //     state: "activa",
  //     type: "legendary",
  //     sellCount: 1,
  //     sellPrice: 200
  //   },

  //   {
  //     name: "plover",
  //     attack: 2,
  //     defense: 3,
  //     img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichoazul1-1.webp",
  //     state: "activa",
  //     type: "legendary",
  //     sellCount: 1,
  //     sellPrice: 500
  //   },

  //   {
  //     name: "gigadude",
  //     attack: 3,
  //     defense: 4,
  //     img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichoblanco.webp",
  //     state: "activa",
  //     type: "legendary",
  //     sellCount: 1,
  //     sellPrice: 300,
  //     createdNFT: true
  //   },

  //   {
  //     name: "octopi",
  //     attack: 4,
  //     defense: 5,
  //     img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichomarron1-1.webp",
  //     state: "activa",
  //     type: "legendary",
  //     sellCount: 1,
  //     sellPrice: 400,
  //     createdNFT: true
  //   },

  //   {
  //     name: "ouster",
  //     attack: 5,
  //     defense: 6,
  //     img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichorojo.webp",
  //     state: "activa",
  //     type: "legendary",
  //     sellCount: 1,
  //     sellPrice: 350,
  //     createdNFT: true
  //   },

  //   {
  //     name: "oxonomy",
  //     attack: 6,
  //     defense: 7,
  //     img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichorosa-1.webp",
  //     state: "activa",
  //     type: "epic",
  //     sellCount: 1,
  //     sellPrice: 500
  //   },
  //   {
  //     name: "kerplunk",
  //     attack: 6,
  //     defense: 7,
  //     img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichoverde2-1.webp",
  //     state: "activa",
  //     type: "epic",
  //     sellCount: 1,
  //     sellPrice: 300
  //   },
  //   {
  //     name: "8",
  //     attack: 6,
  //     defense: 7,
  //     img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bichovioleta-1.webp",
  //     state: "activa",
  //     type: "epic",
  //     sellCount: 1,
  //     sellPrice: 200
  //   },
  //   {
  //     name: "peregrint",
  //     attack: 6,
  //     defense: 7,
  //     img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bolitaceleste.webp",
  //     state: "activa",
  //     type: "rare",
  //     sellCount: 1,
  //     sellPrice: 300
  //   },
  //   {
  //     name: "succotash",
  //     attack: 6,
  //     defense: 7,
  //     img: "https://raw.githubusercontent.com/Analiadlt/PF/Development/client/src/img/img%20optimizadasa/bolitavioleta.webp",
  //     state: "activa",
  //     type: "rare",
  //     sellCount: 1,
  //     sellPrice: 200
  //   },
  // ];
    //  const hola = await cards.map((g) => Card.create(g));
};
router.get("/get", async (req, res) => {
  console.log("Query desde getCards", req.query);
  let orden = req.query.orden || 'ASC'
  let ordenarpor = 'sellPrice'
  switch (orden) {
    case 'ASC': {
      ordenarpor = 'sellPrice';
      break
    }
    case 'DESC': {
      ordenarpor = 'sellPrice';
      break
    }
    case 'A_ASC': {
      ordenarpor = 'attack';
      orden = 'ASC'
      break
    }
    case 'A_DESC': {
      ordenarpor = 'attack';
      orden = 'DESC'
      break
    }
    case 'D_ASC': {
      ordenarpor = 'defense';
      orden = 'ASC'
      break
    }
    case 'D_DESC': {
      ordenarpor = 'defense';
      orden = 'DESC'
      break
    }
    default:
      orden = 'ASC'
  }
  try {
    const allCards = await Card.findAll({
      order: [[ordenarpor, orden]]
    })

    if (allCards.lenght !== 0) {
      // const cardsBuy = allCards.filter(index => index.orderId === null)
      // if (cardsBuy.lenght !== 0) {
      //   res.status(200).send(cardsBuy)
      // }
      const cardsBuy = await Card.findAll({
        where: {orderId: null},
        order: [[ordenarpor, orden]]
      })
      if (cardsBuy.lenght !== 0){
        res.status(200).send(cardsBuy)
      }else{
        res.status(200).send(allCards)
      }
    }} catch (error) {
    res.send("Error en la ruta getCard")
  }
})

router.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      const cardID = await Card.findOne({
        where: {
          id: id,
        },
      });
      if (cardID.length !== 0) res.json(cardID);
      else res.send([{ error: "El ID dela carta no existe" }]);
    } else res.json(allCards);
  } catch (error) {
    res.status(400).send("Error en la base de datos");
  }
});



module.exports = router