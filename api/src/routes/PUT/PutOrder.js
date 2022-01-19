const server = require('express').Router();
const { Order , Card } = require("../../db");

server.put('/', (req, res, next) => {
    const { userId, status, allCards } = req.body //allCards =[cardId]
    
    Order.create({
        userId: userId,
        status: status
    })
    .then(response => {
        const orderId = response.dataValues.id //nos da el id de order;       
        Promise.all(
        allCards.map(elem => {
            Card.update({ orderId }, {
                where: {
                id: elem,
                }
               });  
        }))
        .then( _ => res.send("OK"))
        .catch(err => next(err))
    })
});



module.exports = server;