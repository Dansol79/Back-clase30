module.exports = function numerosRandom(catidadDeNumeros){
    cantidadDeNumeros = Number(cantidadDeNumeros);
    const numeros = {};

    for(let i = 0; i <= cantidadDeNumeros; i++){
        let num = Math.floor(Math.random() * (100 -0 + 1) + 0);

        if(numeros[num]){
            numeros[num]++
        }else{
            numeros[num] = 1
        }
    }
    return numeros;
}