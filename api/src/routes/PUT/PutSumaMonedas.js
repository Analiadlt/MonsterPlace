const { Router } = require("express");
const { User } = require("../../db");


const router = Router();

router.put("/", async (req, res) => {

    let { saldo_cryps, email } = req.body
    const saldoUser = await User.findAll({
        attributes: ['saldo_cryps'],
        where: {
            email: email
        }
    })
    const suma = saldoUser[0].dataValues.saldo_cryps + saldo_cryps
    try {
        let response = await User.update({ saldo_cryps: suma },
            {
                where: {
                    email: email,
                },
            });
        const resultado = await await User.findAll({
            attributes: ['saldo_cryps'],
            where: {
                email: email
            }
        })
        res.send(resultado)
    } catch (error) {

        res.send("Error al actualizar el monedero")
    }


})

module.exports = router
