const express = require("express")
const { User } = require("../../db")

const server = express()

server.post("/", async (req, res) => {
    const { email, firstName, lastName, nickName, dateBirth, password, token } = req.body

    try {
        if (!email || !firstName || !lastName || !nickName || !dateBirth || !password || !token) res.send(" Debe completar todos los campos")
        else {
            let user;
            user = await User.findOne({ where: { email: email }, })
            if (!user) {
                user = await User.create({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    nickName: nickName,
                    dateBirth: dateBirth,
                    password: password,
                    token: token
                })
                res.send("Usuario creado con exito").json(user)
            }
            else res.send("El usuario ya existe")
        }
    }
    catch (error) {
        res.send("Ups...!!!existe un error")
    }
})


module.exports = server