const express = require("express")
const { User } = require("../../db")
const bcrypt = require("bcryptjs")

const server = express()

server.post("/", async (req, res) => {

    const { email, firstName, lastName, nickName, dateBirth, password } = req.body

    try {
      
        else {
            let user;
            user = await User.findOne({ where: { email: email }, })
            if (!user) {
                const rondasHash = 12
                user = await User.create({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    nickName: nickName,
                    dateBirth: dateBirth,
                    password: await bcrypt.hash(password, rondasHash)
                })
                res.send("Usuario creado con exito")
            }
            else res.send("El usuario ya existe")
        
    } catch (error) {
        res.send("Ups...!!!existe un error")
    }
})


module.exports = server

