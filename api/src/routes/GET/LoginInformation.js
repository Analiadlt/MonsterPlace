const {Router} = require("express");
const {User} = require("../../db");


const router = Router();

router.post("/loginInformation", async (req,res) => {
    const email = req.body.email
    console.log(email)
    const info = await User.findAll({
        where:{email:email},
        attributes:{exclude:['password','createdAt','updatedAt','dateBirth','token','id']}
    })
    try {
        res.status(200).send(info)
    } catch (error) {
        res.status(400).send("No se encontro usuario")
    }
})

module.exports = router;