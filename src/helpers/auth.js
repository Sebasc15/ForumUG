const helpers = {};


helpers.isAuthenticated = (req, resp, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('Error_msg','Inicia sesión para continuar');
        resp.redirect('/Estudiante/signin');
    }
}

helpers.isAuthenticatedADM = (req, resp, next) => {
    const rol = req.session.rol;
    if(req.isAuthenticated() & rol=='Admin'){
        return next();
    }else{
        req.flash('Error_msg','No cuentas con autorizacion.');
        resp.redirect('/');
    }
}

module.exports = helpers;