const express = require("express")
const { User, Order , Card} = require("../../db")

const router = express()



router.get("/:email", async (req, res) => {
    const email = req.params.email
    try {
        const userId = await User.findOne({
            where: { email: email },
            include: Order
        })
        if (userId) {
            const userCompras = await Order.findAll({
                where: { userId: userId.id },
                include: Card
            })
            res.send(userCompras)
        }

    } catch (error) {
        res.send("") //No existe el usuario o no tiene compras realizadas
    }

})

module.exports = router
