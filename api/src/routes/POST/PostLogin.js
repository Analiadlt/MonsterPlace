const express = require("express")
const { User } = require("../../db")
const bcrypt = require("bcryptjs")

const server = express()

server.post("/loginUser", async (req, res) => {

    const { email, password } = req.body

    try {
        if (!email || !password) res.status(300).send(" Debe completar todos los campos")

        else {
            const user = await User.findOne({ where: { email: email }, })
            if (user === null) {
                res.status(400).send("Usuario inexistente")
            } else {
                const passwordValidated = await bcrypt.compare(password, user.password)
                if(passwordValidated === true) res.send( user)
                else res.send("Contraseña incorrecta")
            }
        }
    }
    catch (error) {
        res.send("Ups...!!!existe un error")
    }
})


module.exports = server
