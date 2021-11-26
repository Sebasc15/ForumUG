const controlador = {};
const { req, res} = require("express");

const Clase_servicio = require("../services/servicesPublicos/ClasesPublic");
const servicio = new Clase_servicio();

const Profesor_Servicio = require("../services/servicesPublicos/ProfesoresPublic");
const servicio_profesor = new Profesor_Servicio();

const Actividad_Serivicio = require("../services/servicesPublicos/ActividadesPublic");
const servicio_actividad = new Actividad_Serivicio();

const Clases_Estudiantes_Private = require('../services/servicesPublicos/Clases_Estudiantes.Private');
const registro = new Clases_Estudiantes_Private();

//Pagina Principal
controlador.principal = (req, res) => {
  res.render("index");
};

//Todas las Actividades a mostrar (Para publico en general)
controlador.Actividades = async (req, res) => {
  let Clases = await servicio.ObtenerTodasClases();

  const Profesores = await servicio_profesor.ObtenerTodosProfesores();
  const Actividades = await servicio_actividad.ObtenerTodasActividades();

  Clases.forEach((element) => {
    element.ID_Actividad = EncontrarActividad(
      Actividades,
      element.ID_Actividad
    );
    element.NUE = EncontrarProfesor(Profesores, element.NUE);
    element.Fecha = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
    }).format(element.Fecha);
  });

  res.render("ClasesPublic/Listar_Clases_Public", { Clases });
};

controlador.ActividadesID = async (req, res) => {
  const { ID_Clase } = req.params;
  let Clases = await servicio.ObtenerClasePorId(ID_Clase);

  const Profesores = await servicio_profesor.ObtenerTodosProfesores();
  const Actividades = await servicio_actividad.ObtenerTodasActividades();

  Clases.forEach((element) => {
    element.ID_Actividad = EncontrarActividad(
      Actividades,
      element.ID_Actividad
    );
    element.NUE = EncontrarProfesor(Profesores, element.NUE);
    element.Fecha = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
    }).format(element.Fecha);
  });

  res.render("ClasesPublic/Clase_ID", { Clases });
};

//Actividades de los alumnos (Inicio de sesion OBLIGATORIO)
controlador.MisActividades = async (req, res) => {
  const Clases = await registro.ObtenerClasesdeEstudiantes(req);
  res.render('MisActividades/MisClases', { Clases });
};

//Elimnar registro de actividades de los alumnos (Inicio de sesion OBLIGATORIO)
controlador.EliminarRegistroID = async (req, res) => {
  const {ID_Clase} = req.params;
  const respuesta = await registro.EliminarRegistro(ID_Clase, req);

  if(respuesta=="Error al eliminar el registro"){
    req.flash("Error_msg", respuesta);
  }
  if(respuesta=="Registro eliminado con exito"){
    req.flash("success_msg", respuesta);
  }

  res.redirect('/MisActividades');
}



//Perfil de los alimnos (Inicio de sesion OBLIGATORIO)
controlador.Perfil = (req, res) => {
  const usuario =req.user;
  if(req.session.rol=='Estudiante'){
    res.render('Perfil/perfil',{usuario: usuario[0]});
  }else{
    res.render('Perfil/perfilADM',{usuario: usuario[0]});
  }
};


//Registro de los estudiantes en las clases.
controlador.Registro = async(req, res) => {
  const {ID_Clase} = req.params;
  const respuesta = await registro.Registro(ID_Clase, req);

  if(respuesta=="Error al Registrar" || respuesta=="Cupo lleno"){
    req.flash("Error_msg", respuesta);
  }
  if(respuesta=="Ya se encuentra registrado" || respuesta=="Registro Exitoso"){
    req.flash("success_msg", respuesta);
  }
  if(req.app.locals.admin){
    req.flash("Error_msg", respuesta);
  }
  res.redirect('/MisActividades');
}


module.exports = controlador;





function EncontrarProfesor(Profesores, NUE) {
  for (let i = 0; i < Profesores.length; i++) {
    if (Profesores[i].NUE == NUE) {
      return `${Profesores[i].Nombre} ${Profesores[i].Primer_Apellido} ${Profesores[i].Segundo_Apellido}`;
    }
  }
  return NUE;
}

function EncontrarActividad(Actividades, ID_Activiad) {
  for (let i = 0; i < Actividades.length; i++) {
    if (Actividades[i].ID_Actividad == ID_Activiad) {
      return Actividades[i].Nombre_Actividad;
    }
  }
  return ID_Activiad;
}
