const Joi = require('joi');
const { mongodb } = require('../../config/db');
const mongoose = require('mongoose');

mongoose.connect(mongodb.URL, mongodb.options);

const mail = Joi.string().min(4).required();
const password = Joi.string().min(4).required();
const token = Joi.string().min(4);

const userSchema = {
    mail,
    password,
    token
};

const Users = mongoose.model('users', userSchema);

module.exports = Users;