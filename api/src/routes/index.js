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
const postRecupereUser = require("./POST/PostRecoverUser")
const postUserCard = require("./POST/PostUserCard")
const postGame = require("./POST/PostGame")

const router = Router();

router.use('/cards', getCards,getDestacadas,validateInformation(postCardSchema),postCards); 
router.use('/users', getUser,validateInformation(postUserSchema), postUser,validateInformation(putUserPasswordSchema), putUserPassword); 
router.use('/user',validateInformation(putUserInformationSchema),putUserInformation);
router.use('/login',validateInformation(postLoginSchema), postLogin);
router.use('/delete',deleteUser)
router.use("/recover", postRecupereUser)
router.use("/usercard", postUserCard)
router.use("/game", postGame)
// router.use('/')
module.exports = router;
