const {Router} = require ("express");
const {Card} = require("../../db");


const router = Router();

router.delete("/card/:id",async(req,res)=>{

    let id=req.params.id
    try {
        await Card.destroy(
            {
            where: {
                id:id,
            },
        });
        res.status(200).send("Carta Eliminada")
    } catch (error) {
        console.log(error)
        res.status(400).send("Error al eliminar la Carta")
    }

})

module.exports = router
