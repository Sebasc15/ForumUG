const controlador = {};
const { req, res } = require("express");


const Profesor_Servicio = require("../services/ProfesoresServicios");
const servicio = new Profesor_Servicio();


//Crear Profesor
controlador.RenderProfesorForm = (req, res) => {
  res.render("ProfesoresADM/Nuevo-Profesor");
};
controlador.CrearNuevoProfesor = async (req, res) => {
  const { affectedRows } = await servicio.AñadirProfesor(req.body);

  if (affectedRows && affectedRows != 0) {
    req.flash("success_msg", "Profesor agregado correctamente");
  } else {
    if(affectedRows == 'NUE en uso'){
      req.flash("Error_msg", "El NUE ya esta en uso");
    }else{
      req.flash("Error_msg", "Error al agraegar al profesor");
    }
  }

  res.redirect("/Profesor/listar");
};




//Listar Profesores
controlador.Listar_Profesores = async (req, res) => {
  const Profesor = await servicio.ObtenerTodosProfesores();
  res.render("ProfesoresADM/Listar-Profesores", { Profesor });
};




//Editar Profesores
controlador.RenderEditFormProfesor = async (req, res) => {
  const { NUE } = req.params;
  const Profesor = await servicio.ObtenerProfesoresPorId(NUE);
  res.render("ProfesoresADM/Edit-Profesor", { Profesor: Profesor[0] });
};

controlador.EditarProfesor = async (req, res) => {
  const { NUE } = req.params;
  const { Nombre, Primer_Apellido, Segundo_Apellido, Correo } = req.body;
  const datos = { Nombre, Primer_Apellido, Segundo_Apellido, Correo, NUE };

  const resultado = await servicio.ActuzalizarProfesor(datos);
  const { affectedRows } = resultado;
  if (affectedRows && affectedRows != 0) {
    req.flash("success_msg", "Profesor editado correctamente");
  } else {
    req.flash("Error_msg", "Error al editar al profesor");
  }

  res.redirect("/Profesor/listar");
};





//Eliminar Actividades
controlador.EliminarProfesor = async (req, res) => {
  const { NUE } = req.params;
  const result = await servicio.EliminarProfesor(NUE);

  const { affectedRows } = result;
  if (affectedRows && affectedRows != 0) {
    req.flash("success_msg", "Profesor eliminado correctamente");
  } else {
    req.flash("Error_msg", "Error al eliminar al profesor");
  }

  res.redirect("/Profesor/listar");
};

module.exports = controlador;
