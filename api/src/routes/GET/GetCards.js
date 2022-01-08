const { Router } = require("express");
const router = Router();
const { Card } = require("../../db");


const CreateCards = async () => {
  const cards = [
    {
      name: "warlockk",
      attack: 1,
      defense: 2,
      img: "https://drive.google.com/uc?export=download&id=1yeVxV_D4MVTIsb_W5hWk2QZ0l8K3eOPR",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 200
    },

    {
      name: "plover",
      attack: 2,
      defense: 3,
      img: "https://drive.google.com/uc?export=download&id=1J8fq7xIxo1Vvvr2qCCKXP0iRyP3ELSVv",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 500
    },

    {
      name: "gigadude",
      attack: 3,
      defense: 4,
      img: "https://drive.google.com/uc?export=download&id=1AhgGI0372IoycrepAtFwP0KTj0f5QEkG",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 300
    },

    {
      name: "octopi",
      attack: 4,
      defense: 5,
      img: "https://drive.google.com/uc?export=download&id=1A0r3n5QbanVB_Ygc5B30H0xcyJbaROah",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 400
    },

    {
      name: "ouster",
      attack: 5,
      defense: 6,
      img: "https://drive.google.com/uc?export=download&id=18m5JhiyJd79jyIffJS50sOKHeOYvtA4T",
      state: "activa",
      type: "legendary",
      sellCount: 1,
      sellPrice: 350
    },

    {
      name: "oxonomy",
      attack: 6,
      defense: 7,
      img: "https://drive.google.com/uc?export=download&id=175gi7IP1yAAO9WnmlfFZZgbWktiHj7nO",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 500
    },
    {
      name: "kerplunk",
      attack: 6,
      defense: 7,
      img: "https://drive.google.com/uc?export=download&id=13L3sixgWT5LbeuQD9M3dOaeELKHnYhrO",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "8",
      attack: 6,
      defense: 7,
      img: "https://drive.google.com/uc?export=download&id=1m-gfJ6XCsaXmoWXhco53zwNnFk9fWqwb",
      state: "activa",
      type: "epic",
      sellCount: 1,
      sellPrice: 200
    },
    {
      name: "9",
      attack: 6,
      defense: 7,
      img: "https://drive.google.com/uc?export=download&id=1fahXfbmqe-lkcm5TGj-wn2Pnl8Mhi7ho",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 300
    },
    {
      name: "succotash",
      attack: 6,
      defense: 7,
      img: "https://drive.google.com/uc?export=download&id=1U4JqKfKSAQSViJgSJ3di1HN57kC7e_h7",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 200
    },
    {
      name: "peregrint",
      attack: 6,
      defense: 7,
      img: "https://drive.google.com/uc?export=download&id=12e3BACoV-vXjyMSenGFaO8gUeJgWIKwf",
      state: "activa",
      type: "rare",
      sellCount: 1,
      sellPrice: 300
    },
  ];
     const hola = await cards.map((g) => Card.create(g));
};
//acá tenemos la ruta. CreateCards() esta solo para que tengamos una base de datos base.
router.get("/get", async (req, res) => {
  try {
     CreateCards();
    const allCards = await Card.findAll({
      attributes: ["name","attack", "defense", "img", "state", "type", "sellPrice"],
    });

    return res.status(200).send(allCards);
  } catch (e) {
    res.status(404).send("Cant access DB. GET CARDS PROBLEMS");
  
  }
});

module.exports = router;
