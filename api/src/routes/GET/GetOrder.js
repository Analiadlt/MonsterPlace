const server = require('express').Router();
const { Order , Card } = require("../../db");


server.get('/detalle/:id', (req, res, next) => {
    const id = req.params.id
    console.log("Id de la orden: ", id)

    Order.findOne({
        where: {
          id: id,
        },
        include: {
            model: Card,
            where: { orderId: id }
        }
    })
    .then(obj => {
        res.send(obj)
    })
    .catch(next)
});



module.exports = server;