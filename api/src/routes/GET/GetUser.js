const express = require("express")
const { User } = require("../../db")
const userHelper = require("./dataHelper/userDataHelper")

const server = express()


const getUser = async () => {
    const users = await User.findAll()

    if (users.length === 0) {
        const infoUser = userHelper.map(index => {
            return {
                id: index.id,
                email: index.email,
                firstName: index.firstName,
                lastName: index.lastName,
                nickName: index.nickName,
                dateBirth: index.dateBirth,
                password: index.password,
                token: index.token
            }
        })
        const addUser = await User.bulkCreate(infoUser)
        return addUser
    }
    return users
}


server.get("/", async (req, res) => {
    const allUsers = await getUser()
    const nickName = req.query.nickName

    try {
        if (nickName) {
            const userByNickName = allUsers.filter(index => index.nickName.toLowerCase().includes(nickName.toLowerCase()))
            if (userByNickName.length > 0) res.json(userByNickName)
            else res.send([{ error: "no se encontraron coincidencias" }])
        }
        else res.json(allUsers)
    }
    
    catch (error) {
        res.send("Error en la base de datos")
    }
})

server.get("/:id", async (req, res) => {
    const allUsers = await getUser()
    const id = req.params.id

    try {
        if(id){
            const userID = allUsers.filter(index => index.id === id) 
            if(userID.length !== 0) res.json(userID)
            else res.send([{ error: "El ID del usuario no existe"}])
        }
        else res.json(allUsers)
    } catch (error) {
        res.status(400).send("Error en la base de datos")
    }
})

module.exports = server