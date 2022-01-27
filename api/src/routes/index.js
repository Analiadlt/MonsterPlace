const { Router } = require('express');
const {postCardSchema,postUserSchema, postLoginSchema,putUserInformationSchema,putUserPasswordSchema,putLoginInformation} = require("./ROUTES VALIDATES/schema");
const validateInformation = require("./ROUTES VALIDATES/middleware");


const getCards = require('./GET/GetCards')
const getUser = require('./GET/GetUser')
const postUser = require('./POST/PostUser')
const putUserInformation = require('./PUT/PutUserInformation') 
const putUserPassword = require('./PUT/PutUserPassword') 
const deleteUser = require('./DELETE/DeleteUser')
const postCards = require('./POST/PostCards')
const postLogin = require('./POST/PostLogin')
const getDestacadas = require('./GET/GetDestacadas')
const postRecoverUser = require("./POST/PostRecoverUser")
const loginInfo= require("./GET/LoginInformation")
const loginInfoMetamask= require("./GET/LoginInformationMetamask")
const postOrder = require('./POST/PostOrder');
const mercadopago = require('./GET/GetMercadoPago');
const postUserCard = require("./POST/PostUserCard");
const CardUser = require("./GET/GetUser-Card");
const postLogicGame = require("./POST/PostLogicGame");
const putSumaMonedas = require("./PUT/PutSumaMonedas");
const putRestaMonedas = require("./PUT/PutRestaMonedas");
const getMonedas = require ("./GET/GetMonedas");
const putMetamask = require ("./PUT/PutMetamask")
const postCardsNft =require ("./POST/PostCardsNFT.js")
const putResultado = require("./PUT/PutResultado");
const getUserStats = require("./GET/GetUserStats")
const putLinkUserCardNFT = require("./PUT/PutLinkUserCardNFT")
const deleteCard = require("./DELETE/DeleteCard")


const router = Router();

router.use('/cards', getCards,getDestacadas,validateInformation(postCardSchema),postCards);
router.use('/postcards', postCardsNft);  
router.use('/users', getUser,validateInformation(postUserSchema), postUser,validateInformation(putUserPasswordSchema), putUserPassword); 
router.use('/user',validateInformation(putUserInformationSchema),putUserInformation);
router.use('/login',validateInformation(postLoginSchema), postLogin);
router.use('/delete',deleteUser,deleteCard)
router.use("/recover", postRecoverUser)
router.use("/loginInfo",loginInfo)
router.use("/loginInfo",loginInfoMetamask)
router.use('/order', postOrder);
router.use('/mercadopago', mercadopago);
router.use("/usercard", postUserCard)
router.use("/CardUser",CardUser)
router.use("/game", postLogicGame)
router.use("/putsumamonedas",putSumaMonedas)
router.use("/putrestamonedas",putRestaMonedas)
router.use("/getmonedas",getMonedas)
router.use("/putmetamask",putMetamask)
router.use("/resultado",putResultado)
router.use("/putlinkusercardNFT", putLinkUserCardNFT)
router.use('/stats', getUserStats);
// router.use('/')

module.exports = router;
