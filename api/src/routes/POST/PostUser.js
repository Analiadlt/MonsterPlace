const express = require("express")
const { User } = require("../../db")

const server = express()

server.post("/", async (req, res) => {
    const { email, userName, nickName, dateBirth, password, token } = req.body
    console.log("DATOS", dateBirth)

    try {
        if (!email || !userName || !nickName || !dateBirth || !password || !token) res.send(" debe completar todos los campos")

        else {
            const userCreate = await User.create({
                email: email,
                userName: userName,
                nickName: nickName,
                dateBirth: dateBirth,
                password: password,
                token: token
            })
            console.log("CREADO", userCreate)
            res.json(userCreate)
        }

    }
    catch (error) {
        res.send(error)
    }
})

module.exports = server