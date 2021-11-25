const controlador = {};
const { req, res } = require('express');
const Actividad_Serivicio = require('../services/ActividadesServicios');
const servicio = new Actividad_Serivicio();

//Crear Actividades
controlador.RenderActividadForm = (req, res) =>{
    res.render('ActividadesADM/Nueva-Actividad');
}
controlador.CrearNuevaActividad = async (req, res) =>{

    const {affectedRows} = await servicio.AnadirActividad(req.body);
    
    if(affectedRows && affectedRows!=0){
        req.flash('success_msg', 'Actividad agregada correctamente');
    }else{
        req.flash('Error_msg', 'Error al agragar la actividad');
    }
    res.redirect('/Actividades/listar');

}

//Listar Actividades
controlador.Listar = async (req, res) =>{
    const Actividad = await servicio.ObtenerTodasActividades();
    res.render('ActividadesADM/Listar-Actividades', { Actividad });
}

//Editar Actividades
controlador.RenderEditForm = async (req, res) =>{
    const {ID_Actividad}=req.params;
    const Actividad = await servicio.ObtenerActividadesPorId(ID_Actividad);
    res.render('ActividadesADM/Edit-Actividad', { Actividad: Actividad[0] });
}
controlador.EditarActividad = async (req, res) =>{

    const { ID_Actividad } = req.params; 
    const { Nombre_Actividad } = req.body;

    const datos = { ID_Actividad, Nombre_Actividad };

    const resultado = await servicio.ActuzalizarActividad(datos);

    const {affectedRows} = resultado;
    if(affectedRows && affectedRows!=0){
        req.flash('success_msg', 'Actividad editada correctamente');
    }else{
        req.flash('Error_msg', 'Error al editar la actividad');
    }

    res.redirect('/Actividades/listar');
}

//Eliminar Actividades
controlador.EliminarActividad = async (req, res) =>{
    const {ID_Actividad} = req.params;

    const result = await servicio.EliminarActividad(ID_Actividad);
    const { affectedRows } = result;
    if(affectedRows && affectedRows!=0){
        req.flash('success_msg', 'Actividad eliminada correctamente');
    }else{
        req.flash('Error_msg', 'Error al eliminar la actividad');
    }

    res.redirect('/Actividades/listar');
}

module.exports = controlador;