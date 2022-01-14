const express = require("express")
const { Card } = require("../../db")

const server = express()

const playGame = (playerOneCards, playerTwoCards) => {
    let jug1atk = 0;
    let jug2atk = 0;
    let jug1def = 0;
    let jug2def = 0;
    let vida1 = 100;
    let vida2 = 100;

    //turno 1
    while (playerOneCards.length !== 0) {

        jug1atk = playerOneCards.pop();
        jug1def = jug1atk;
        jug2atk = playerTwoCards.pop();
        jug2def = jug2atk;

        //turno 1
        if (jug1atk.attack > jug2def.defense) {
            vida2 = vida2 - (jug1atk.attack - jug2def.defense);
        }
        if (jug2atk.attack > jug1def.defense) {
            vida1 = vida1 - (jug2atk.attack - jug1def.defense);
        }
        if (vida1 <= 0 || vida2 <= 0) {
            if (vida1 > vida2) return "PLAYER ONE";
            if (vida2 > vida1) return "PLAYER TWO";
            if (vida1 === vida2) return "TIE";
        }
    }
    if (playerOneCards.length === 0) {
        if (vida1 > vida2) return "PLAYER ONE";
        if (vida2 > vida1) return "PLAYER TWO";
        if (vida1 === vida2) return "TIE";
    }
};

server.post("/play", async (req, res) => {

    const idCardP1 = req.body.playerOneCards
    const idCardP2 = req.body.playerTwoCards

    try {
        if (!idCardP1) res.send("Falta el jugador 1")
        else if (!idCardP2) res.send("Falta el jugador 2")
        else {
            const cardsP1 = await Card.findAll({ where: { id: idCardP1 } })
            const cardsP2 = await Card.findAll({ where: { id: idCardP2 } })

            const playerOneCards = cardsP1.map(card => {
                return {
                    attack: card.attack,
                    defense: card.defense
                }
            })

            const playerTwoCards = cardsP2.map(card => {
                return {
                    attack: card.attack,
                    defense: card.defense
                }
            })
            if (playerOneCards.length === 3 && playerTwoCards.length === 3) {
                const result = playGame(playerOneCards, playerTwoCards)
                res.send(result)
            }
            res.send("Error al cargar las cartas")
        }
    }
    catch (error) {
        console.log("ERROR", error)
        res.send("Error en la partida")
    }
})

module.exports = server
