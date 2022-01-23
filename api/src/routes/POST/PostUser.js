const express = require("express")
const { User } = require("../../db")
const bcrypt = require("bcryptjs")

const server = express()

server.post("/", async (req, res) => {

    const {image, email, firstName, lastName, nickName, dateBirth, password } = req.body
    const nick = await User.findOne({where:{nickName:nickName}})
    console.log("IMAGEN",image)

    try {
        if(!nick){
            let user;
            user = await User.findOne({ where: { email: email }, })
            if (!user) {
                const rondasHash = 12
                user = await User.create({
                    image:image,
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
        } else {
            res.send({message:"El Nickname ya existe"})
        }
    } catch (error) {
        res.send("Ups...!!!existe un error")
    }
})


module.exports = server

