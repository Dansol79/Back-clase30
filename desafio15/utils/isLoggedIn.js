module.exports = function isLoggedIn(req, res, next){
    if(req.session.email){
        res.redirect('/login');
        return;
    }
    next();
}