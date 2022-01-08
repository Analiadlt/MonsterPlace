const {Router} = require ("express");
const {Card} = require("../../db");


const router = Router();

router.post("/", async (req,res)=>{
    
  let {name,attack,defense,img,state,type,sellPrice,sellCount}=req.body;


    try {

        const [newCard,create] = await Card.findOrCreate({where:{name:name},defaults:{
            attack,
            defense,
            img,
            state,
            type,
            sellPrice,
            sellCount
        }});
    
        res.send(newCard);
    } catch (error) {
        res.send ("Error al crear carta")
    }

})


module.exports = router;
