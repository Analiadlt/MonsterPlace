const {Router} = require ("express");
const {User} = require("../../db");


const router = Router();

router.delete("/",async(req,res)=>{
    console.log(req.query.email)
    try {
        let {email}=req.query
        await User.destroy(
            {
            where: {
                email:email,
            },
        });
        res.send("Ususario Eliminado")
    } catch (error) {
        res.send("Error al eliminar usuario")
    }

})

module.exports = router