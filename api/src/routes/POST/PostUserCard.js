const express = require("express")
const { User, Card } = require("../../db")

const server = express()

server.post("/buy", async (req, res) => {
    const { email, idCard } = req.body

    try {
        const user = await User.findOne({ where: { email: email } })
        const cards = await Card.findAll({ where: { id: idCard } })

        if (!user) {
            res.send("No existe el usuario")
        }
        if (!cards) {
            res.send("No existe la carta solicitada")
        }

        for (let i = 0; i < cards.length; i++) {
            await user.addCards(cards[i])
        }
        res.send("Cartas agregadas satifactoriamente")
    }
    catch (error) {
        res.send("Error en la base de datos")
    }
})

module.exports = server
