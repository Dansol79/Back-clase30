const Users = require('./UsersSchema');
const { Router } = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');
// const authenticateToken = require('../utils/authenticateToken');

module.exports = (app) => {
    app.use('/login', router);

    router.get('/', (req, res) => {
        res.render('login');

    });

    router.post('/', async (req, res) => {

        const {email, password} = req.body;
        if(!email || !email.length) {
                  res.status(401).send();
                  return;
                }

        try{
            const user = await Users.find({email});

            if(user.length == 0){
               user.push({password:''})
            }

            const confirmPassword = await bcrypt.compare(password, user[0].password);

            if(!confirmPassword){
                console.log('Error, clave incorrecta')
                return res.render('login-error');
            }

            const accessToken = generateToken(user);
            console.log(accessToken);

            return res.render('index', {email: res.email});

        }catch(error){
            console.log(error);
        }
    })

}

