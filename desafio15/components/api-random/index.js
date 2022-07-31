const { Router } = require('express');
const router = new Router();
const { yargObj } = require('../../utils/yarg');
const PORT =  yargObj.port;


const { fork } = require('child_process');
const child_process = fork('./components/api-random/child_process');

module.exports = (app) => {
    app.use('/api/random', router);
        
        router.get('/', (req, res) => {
            console.log(`Servidor en puerto ${PORT} || worker ${process.pid} started!`);
            let cant = req.query.cantidad ||100000000;
            child_process.send(cant);
            child_process.on('message', (msj) => {
                res.send(msj.res);
            });
        });
}