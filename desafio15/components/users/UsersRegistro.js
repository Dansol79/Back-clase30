const Users = require('./UsersSchema');
const { Router} = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const isRegistered = require('../../utils/isRegistered');

module.exports = (app) => {
    app.use('/registro', router);

    router.get('/', (req, res) => {
        res.render('registro');
    });

    router.post('/', isRegistered, async (req, res) => {

        try{

            const {email, password} = req.body;

            if(!email || !email.length){
                res.status(402).json({
                    error: ' No se envio un nombre para el login'
                })
                return;
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = {
                email: email,
                password: hashedPassword
            };

            await Users.create(newUser);
            res.redirect('/login');
        }catch(error){
            console.log(error);
        }
    })
}