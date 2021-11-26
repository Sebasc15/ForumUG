const controlador = {};
const { req, res} = require("express");

const Clase_admin = require("../services/adminServicios")
const servicio = new Clase_admin();

controlador.registrar = async (req, res) => {
    
    var registro = await servicio.registrar(req, res);
    
    const {affectedRows} = registro;
    if(affectedRows!=0){
        const respuesta = "Registro exitoso";
        req.flash("success_msg", respuesta);    
    }else{
        const respuesta = "Error al registrar";
        req.flash("Error_msg", respuesta);
    }
  
    res.redirect('/Perfil');
};

module.exports = controlador;