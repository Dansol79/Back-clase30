const Users = require('../components/users/UsersSchema');

module.exports = async function isRegistered(req, res, next){

    const { email} = req.body;

    const exists = await Users.find({email : email});

    if(exists.length){
        res.render('registro-UsuarioRegistrado');
        return;
    }
    next();
}
