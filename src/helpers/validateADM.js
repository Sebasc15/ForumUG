const { validationResult } = require('express-validator');

const Profesor_Servicio = require("../services/ProfesoresServicios");
const servicio_profesor = new Profesor_Servicio();

const Actividad_Serivicio = require("../services/ActividadesServicios");
const servicio_actividad = new Actividad_Serivicio();

const validateResult = async (req, resp, next, opt) => {
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

        if(opt){
            //Actividad
            if(opt==1){
                const {Nombre_Actividad} = req.body;
                resp.render('ActividadesADM/Nueva-Actividad', {errors, Nombre_Actividad});
            }
            //Clase
            if(opt==2){
                const Profesor = await servicio_profesor.ObtenerTodosProfesores();
                const Actividad = await servicio_actividad.ObtenerTodasActividades();

                const {Nombre_Clase, Fecha, Locacion, Horario, Cupo, Descripcion} = req.body;

                resp.render('ClasesADM/Nueva-Clase', {errors, Nombre_Clase, Locacion, Fecha, Horario, Cupo, Descripcion, Profesor, Actividad});
            }
            //Profesor
            if(opt==3){
                const {NUE, Nombre, Primer_Apellido, Segundo_Apellido, Correo} = req.body;
                resp.render('ProfesoresADM/Nuevo-Profesor', {errors, NUE, Nombre, Primer_Apellido, Segundo_Apellido, Correo});
            }
        }else{
            req.flash("Error_msg", "Error no identificado, contacta al administador");
            resp.redirect('/');
        }
    }
};

module.exports  = { validateResult };