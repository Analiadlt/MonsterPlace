const {Router} = require ("express");
const {User,Card} = require("../../db");


const router = Router();




router.post("/", async (req,res)=>{
    let {name,attack,defense,img,state,condition,sellPrice}=req.body;
    console.log(req.body)
    try {

        const [newCard,create] = await Card.findOrCreate({where:{name:name},defaults:{
            attack,
            defense,
            img,
            state,
            condition,
            sellPrice
        }});
        console.log("NewCard",newCard)
    
        
        res.json(newCard);
    } catch (error) {
        console.log(error)
        res.send ("Error al crear carta")
    }

})


module.exports = router;

// antes de pushear que hagan cambios en DB
// PRIMARY KEY
// RELACION SE CREA EN OTRA RUTA CUANDO COMPRAS CARTAS