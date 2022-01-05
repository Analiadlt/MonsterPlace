const { Router } = require('express');

const getCards = require('./GET/GetCards')
const getUser = require('./GET/GetUser')
const postUser = require('./POST/PostUser')
const putUserInformation = require('./PUT/PutUserInformation') 
const putUserPassword = require('./PUT/PutUserPassword') 
const deleteUser = require('./DELETE/DeleteUser')



const router = Router();

router.use('/cards', getCards); 

router.use('/user', getUser, postUser, putUserInformation, putUserPassword, deleteUser); 



module.exports = router;
