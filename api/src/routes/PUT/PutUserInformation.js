const {Router} = require ("express");
const axios = require ("axios");
const {User} = require("../../db");


const router = Router();

router.put("/",async(req,res)=>{
    try {
        let{ email, firstName, lastName, nickName, dateBirth }=req.body
        let response=await User.update({ firstName, lastName, nickName, dateBirth },
            {
            where: {
                email:email,
            },
        });
        res.send(response)
    } catch (error) {
        res.send(error)
    }

})

module.exports = router