const { Order, Card} = require("../../db");
const router = require('express').Router();

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
//const Card = require("../../models/Card");

const { ACCESS_TOKEN , REACT_APP_CLIENT} = process.env;
// REACT_APP_CLIENT = "http://localhost:3000"
// REACT_APP_API = "http://localhost:3001"

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN
});


//Ruta que genera la URL de MercadoPago
router.get("/:id", async (req, res, next) => {

  const id_orden = req.params.id;

  const orden = await Order.findOne({
    where: {
      id: id_orden
    }
  })

  const carrito = await Card.findAll({
    where: {
      orderId: id_orden
    }
  })
  console.log('nroorden', orden)
  console.log('carrito', carrito)
  // ejemplo de carrito = [
  //   {id: 1, title: "plover", quantity: 1, price: 100},
  //   {id: 2, title: "warlockk", quantity: 1, price: 500}
  // ]
  
  const items_ml = carrito?.map(i => ({
    title: i.name,
    unit_price: Math.ceil(i.sellPrice),
    quantity: 1,
  }))

  // Crea un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference : `${id_orden}`,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm"
        }
      ],
      installments: 24  //Cantidad máximo de cuotas
    },
    back_urls: {
      success: '/mercadopago/pagos',
      failure: '/mercadopago/pagos',
      pending: '/mercadopago/pagos',
    },
  };

  mercadopago.preferences.create(preference)

  .then(function(response){
    
    console.info('respondio')

  //Este valor reemplazará el string"<%= global.id %>" en tu HTML
    global.id = response.body.id;
    res.json({ id: global.id });

  })
  .catch(function(error){
    console.log(error);
  })
}) 


//Ruta que recibe la información del pago
router.get("/pagos", (req, res)=>{
  console.info("EN LA RUTA PAGOS ", req)
  const payment_id= req.query.payment_id
  const payment_status= req.query.status
  const external_reference = req.query.external_reference
  const merchant_order_id= req.query.merchant_order_id
  //console.log("EXTERNAL REFERENCE ", external_reference)

  //Aquí edito el status de mi orden
  //proceso los datos del pago 
  //redirijo de nuevo a react con mensaje de exito, falla o pendiente
  Order.findByPk(external_reference)
  .then((order) => {
    order.payment_id= payment_id
    order.payment_status= payment_status
    order.merchant_order_id = merchant_order_id
    order.status = "completed"
    console.info('Salvando order')
    order.save()
    .then((_) => {
      console.info('redirect success')
      
      return res.redirect(REACT_APP_CLIENT)
    })
    .catch((err) =>{
      console.error('error al salvar', err)
      return res.redirect(`${REACT_APP_CLIENT}/?error=${err}&where=al+salvar`)
    })
  })
  .catch(err =>{
    console.error('error al buscar', err)
    return res.redirect(`${REACT_APP_CLIENT}/?error=${err}&where=al+buscar`)
  })
})


//Busco información de una orden de pago
router.get("/pagos/:id", (req, res)=>{
  const mp = new mercadopago(ACCESS_TOKEN)
  const id = req.params.id
  console.info("Buscando el id", id)
  mp.get(`/v1/payments/search`, {'status': 'pending'}) //{"external_reference":id})
  .then(resultado  => {
    console.info('resultado', resultado)
    res.json({"resultado": resultado})
  })
  .catch(err => {
    console.error('No se consulto:', err)
    res.json({
      error: err
    })
  })
})

module.exports = router;