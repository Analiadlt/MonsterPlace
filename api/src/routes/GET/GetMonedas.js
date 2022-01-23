const { Router } = require("express");
const { User } = require("../../db");


const router = Router();
router.get("/", async (req, res) => {
    let { email } = req.body

    try {
        if (email) {
            const userMoney = await User.findAll({
                attributes: ['saldo_cryps'],
                where: {
                    email: email
                }
            })
            res.send(userMoney)
        }
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router 