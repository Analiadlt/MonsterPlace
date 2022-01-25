const express = require("express")
const { User, Card } = require("../../db")

const server = express()

server.put("/", async (req, res) => {
    const { metamaskAccount, nftContract } = req.body

    try {
        const user = await User.findOne({ where: { metamaskAccount: metamaskAccount } })
        const cards = await Card.findAll({ where: { nftContract: nftContract } })
        console.log("user data base", user)
        console.log("cards data base", cards)

        if (!user) {
            res.send("No existe el usuario")
        }
        if (!cards) {
            res.send("No existe la carta solicitada")
        }

        user.addCards(cards);
      
        res.send("Carta agregadas satifactoriamente")
    }
    catch (error) {
        console.log(error)
        res.send("Error en la base de datos")
    }
})

module.exports = server