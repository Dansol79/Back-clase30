const numerosRandom = require('../../utils/numerosRandom');

process.on('message', async (data) => {
    let numeros = numerosRandom(cant);
    process.send({res: numeros})
});

