const { Router } = require("express");
const { User } = require("../../db");


const router = Router();

router.put("/", async (req, res) => {

    let { resultado, email } = req.body // resultado = 'ganador' || 'perdedor'

   try {
        const user = await User.findOne({
                        attributes: ['win_games', 'lost_games'],
                        where: {
                                email: email
                            }
                    })
        if (user){
            if (resultado==='ganador') {
                let result = user.win_games + 1;
                await User.update({ win_games: result },
                    {
                        where: {
                        email: email,
                    },
                    }); 
            } else {
                    let result = user.lost_games + 1;
                    await User.update({ lost_games: result },
                    {
                        where: {
                        email: email,
                    },
                    }); 
            }
            res.send("Resultado de la partida guardado")}
    } catch (error) {

        res.send("Error al guardar resultado de la partida")
 }
})

module.exports = router
