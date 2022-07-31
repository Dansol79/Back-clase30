const { Router} = require('express');
const router = new Router();


module.exports = (app) => {
    app.use('/login', router);

    app.get('/', (req, res) => {
        res.render('login');
    });

    router.post('/', (req, res) => {
        const name = req.body.name;
        if(!name || !name.length){
            res.status(401).json({error: 'No se envio un nombre para el login' });
            return;
        }
        req.session.name = name;
        res.redirect('/');
    });
    
}