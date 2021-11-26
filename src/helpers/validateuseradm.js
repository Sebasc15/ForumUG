const { validationResult } = require('express-validator');

const validateResult = (req, resp, next) => {
    try{
        validationResult(req).throw();
        return next();
    }catch(e){
        const error = e.array();
        let errors = [];
        error.forEach(element => {
            let {msg, param} = element;

            if(msg == 'Invalid value') msg = 'Valor invalido';

            if(msg =='Valor invalido'){
                errors.push({text:msg+" en el parametro "+param});
            }else{
                errors.push({text:msg});
            }
        });

        const {NUE, Nombre, Correo} = req.body;
        resp.render('Usuarios/ADMSignUp', {errors,NUE,Nombre,Correo});
    }
};

module.exports  = { validateResult };