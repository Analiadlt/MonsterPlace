const server = require('express').Router();
const { Order, Card, User } = require("../../db");


server.post('/', async (req, res, next) => {
    const { email, allCards } = req.body 
    console.log('Datos desde Post Order', req.body);
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        
        const order = await Order.create({
            userId: user.id
        })
      
        const cartas = await Card.findAll(
            {
                where: {
                    id: allCards
                }
            }
        )

        if (!user) res.send('No existe el usuario.');
        if (!cartas) res.send('No existe la carta solicitada.');

        for (i = 0; i < cartas.length; i++) {
            await order.addCards(cartas[i])
        }
         res.json(order);

    } catch (error) {
            res.send('Error en la operación')
    }
});



module.exports = server;