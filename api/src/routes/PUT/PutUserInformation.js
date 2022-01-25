const {Router} = require ("express");
const {User} = require("../../db");


const router = Router();

router.put("/putUser",async(req,res)=>{
    try {
        let{ email, firstName, lastName, nickName, dateBirth }=req.body
        let response=await User.update({ firstName, lastName, nickName, dateBirth },
            {
            where: {
                email:email,
            },
        });
        res.send("Ususario actualizado")
    } catch (error) {
        res.send("Error al actualizar usuario")
    }

})

module.exports = router
