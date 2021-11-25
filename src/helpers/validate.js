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

            if(param == 'ConfirContraseña') param = 'Confirmar contraseña';
            if(msg == 'Invalid value') msg = 'Valor invalido';

            if(param == 'ID_Clase'){
                req.flash("Error_msg", msg + " en el parametro "+param);
                resp.redirect('/Actividades');
            }
            if(param == 'ID_Actividad'){
                req.flash("Error_msg", msg + " en el parametro "+param);
                resp.redirect('/Actividades');
            }
            if(param == 'NUE'){
                req.flash("Error_msg", msg + " en el parametro "+param);
                resp.redirect('/Actividades');
            }
            if(msg =='Valor invalido'){
                errors.push({text:msg+" en el parametro "+param});
            }else{
                errors.push({text:msg});
            }
        });

        const {NUA, Nombre, Primer_Apellido, Segundo_Apellido, Correo} = req.body;
        resp.render('Usuarios/SignUp', {errors,NUA,Nombre,Primer_Apellido,Segundo_Apellido,Correo});
    }
};

module.exports  = { validateResult };