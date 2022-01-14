const express = require("express")
const { User, Card } = require("../../db")

const server = express()

server.post("/:id/buy", async (req, res) => {
    const email = req.body.email
    const idCard = req.params.id

    try {
        const user = await User.findOne({ where: { email: email } })
        const cardDB = await Card.findByPk(idCard)

        if(!user){
            res.send("Usuario inexistente")
        }
        if(!cardDB){
            res.send("No existe la carta solicitada")
        }
        
        user.addCards(cardDB)
        res.send("Compra exitosa")
        
    }
    catch (error) {
        res.send("Ocurrio un error")
    }
})

module.exports = server
