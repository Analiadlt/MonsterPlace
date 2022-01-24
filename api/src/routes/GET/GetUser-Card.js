const express = require("express")
const { User, Card } = require("../../db")

const router = express()



router.get("/userCard/:id", async (req, res) => {
    const id = req.params.id
    try {

        const userCard = await User.findAll({
            where: { id: id },
            include: Card
        })

        res.send(userCard)

    } catch (error) {
        res.send("No existe el usuario o no tiene cartas para jugar")
    }

})

module.exports = router
