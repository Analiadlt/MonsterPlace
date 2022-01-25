const Joi = require("@hapi/joi");

module.exports = {
    postCardSchema:Joi.object({
        name:Joi.string().required(),
        attack:Joi.number().integer().required(),
        defense:Joi.number().integer().required(),
        img:Joi.string().required(),
        state:Joi.string().required(),
        type:Joi.string().required(),
        sellPrice:Joi.number().required(),
        sellCount:Joi.number().integer().required()  
    }),

    postUserSchema:Joi.object({
        image:Joi.string().required(),
        email:Joi.string().email().required(),
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        nickName:Joi.string().required(),
        dateBirth:Joi.date().iso(),
        password:Joi.string().required()
    }),

    postLoginSchema:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }),

    putUserInformationSchema:Joi.object({
        email:Joi.string().email().required(),
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        nickName:Joi.string().required(),
        dateBirth:Joi.string().required(),
        country:Joi.string()
    }),

    putUserPasswordSchema:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })
}