const { Router } = require("express");
const router = Router();
const { Card } = require("../../db");

//esta función iría en un controlador (se me rompe cuando la requiero) ya que sería removida una vez tengamos la ruta de crear cartas
const CreateCards = async () => {

const cards = [{
  attack: 1,
  defense: 2,
  img: "imagen",
  state: "activa",
  condition: "fuego",
}, 

{
    attack: 2,
    defense: 3,
    img: "imagen",
    state: "activa",
    condition: "fuego",
  }, 

  {
    attack: 3,
    defense: 4,
    img: "imagen",
    state: "activa",
    condition: "fuego",
  }, 

  {
    attack: 4,
    defense: 5,
    img: "imagen",
    state: "activa",
    condition: "fuego",
  }, 

  {
    attack: 5,
    defense: 6,
    img: "imagen",
    state: "activa",
    condition: "fuego",
  }, 

  {
    attack: 6,
    defense: 7,
    img: "imagen",
    state: "activa",
    condition: "fuego",
  }, 
]
   const createCards =  await cards.map(g => Card.create(g))

}
//--------------------------------------------------------------
//acá tenemos la ruta. CreateCards() esta solo para que tengamos una base de datos base.
router.get("/", async (req, res) => {
  try {
    CreateCards()
    const allCards = await Card.findAll({
      attributes: ["attack", "defense", "img", "state", "condition"],
    });

    return res.status(200).send(allCards);
  } catch (e) {
    res.status(404).send("Cant access DB. GET CARDS PROBLEMS");
  }
});

module.exports = router;
