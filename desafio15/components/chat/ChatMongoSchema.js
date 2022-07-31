const { object } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');
const { mongodb } = require('../../config/db');

mongoose.connect(mongodb.URL, mongodb.options);

const email = Joi.string().min(4).required();
const nombre = Joi.string().min(4).required();
const apellido = Joi.string().min(4).required();
const alias = Joi.string().min(4).required();
const edad = Joi.number().required();
const avatar = Joi.string().min(4).required();
const fecha = Joi.string().min(4).required();
const author = Joi.object({
    email: email,
    nombre: nombre,
    apellido: apellido,
    alias: alias,
    edad: edad,
    avatar: avatar
}).required();
const text = Joi.string().min(4).required();

const messageSchema = {
    author,
    fecha,
    text
}

const Messages = mongoose.model('mensajes', messageSchema);

module.exports = Messages;