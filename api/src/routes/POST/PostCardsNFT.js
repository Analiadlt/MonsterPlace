const { Router } = require("express");
const { Card } = require("../../db");

const router = Router();

router.post("/", async (req, res) => {
  const datosFront = req.body;
  console.log("Datos desde Post NFT", datosFront)
  try {
     datosFront.map((g) => {
        Card.findOrCreate({
        where: { name: g.name },
        defaults: {
          attack: g.description[0],
          defense: g.description[1],
          img: g.img,
          sellPrice: g.sellPrice,
          createdNFT: g.createdNFT,
          nftContract: g.nftContract,
        },
      });

      
    });
    res.send("Carta guardada");
  } catch (error) {
    console.log(error);
    res.send("Error al crear carta");
  }
});

module.exports = router;
