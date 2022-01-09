const {Router} = require("express");
const {Card} = require("../../db");


const router = Router();

router.get("/destacadas", async (req,res) => {
    const destacadas = await Card.findAll({
        limit:4
    })
    try {
        res.status(200).send(destacadas)
    } catch (error) {
        res.status(400).send("No se encontraron las cartas")
    }
})

module.exports = router;