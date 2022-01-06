const express = require("express")
const { User } = require("../../db")

const server = express()

server.post("/", async (req, res) => {
    const { email, firstName, lastName, nickName, dateBirth, password, token } = req.body
    console.log("DATOS", dateBirth)

    // try {
    //     if (!email || !userName || !nickName || !dateBirth || !password || !token) res.send(" Debe completar todos los campos")

    //     else {
    //         const [user, created] = await User.FindOrCreate({
    //             where: { email: email },
    //             defaults: {
    //                 userName: userName,
    //                 nickName: nickName,
    //                 dateBirth: dateBirth,
    //                 password: password,
    //                 token: token
    //             }
    //         })
    //         console.log("USUARIO", user)
    //         res.send("creado")
    //     }

    // }
    // catch (error) {
    //     res.send("Ups...!!!existe un error")
    // }
    
    
    try {
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
        }
        
        for (const country of countries) {
            country.addActivity(activity)
        }
        
        // const union = await activity.addCountries(countryID)
        // res.send(union)
        res.send(activity)
    }
    catch (error) {
        res.send("Ups...!!!existe un error")
    }
})


module.exports = server