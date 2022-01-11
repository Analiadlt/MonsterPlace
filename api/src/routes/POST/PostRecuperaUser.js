const express = require("express")
const { User } = require("../../db")
const bcrypt = require("bcryptjs")

const server = express()

server.post("/", async (req, res) => {

    const { email} = req.body

    try {
               
            const user = await User.findOne({ where: { email: email }, })
            if (user === null) {
                res.status(400).send("Usuario inexistente")
            } else {
               res.status(200).send(user)
            }
        
    }
    catch (error) {
        res.send("Ups...!!!existe un error")
    }
})


module.exports = server
