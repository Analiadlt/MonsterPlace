const {Router} = require ("express");
const {User} = require("../../db");


const router = Router();

router.delete("/user/:id",async(req,res)=>{

    let id=req.params.id
    console.log(id)
    try {
        await User.destroy(
            {
            where: {
                id:id,
            },
        });
        res.status(200).send("Usuario Eliminado")
    } catch (error) {
        res.status(400).send("Error al eliminar usuario")
    }

})

module.exports = router
