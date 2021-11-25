const controlador = {};
const { req, res } = require("express");
const Clase_Servicio = require("../services/ClasesServicios");
const servicio = new Clase_Servicio();

const Profesor_Servicio = require("../services/ProfesoresServicios");
const servicio_profesor = new Profesor_Servicio();

const Actividad_Serivicio = require("../services/ActividadesServicios");
const servicio_actividad = new Actividad_Serivicio();

//Crear Clase
controlador.RenderClaseForm = async (req, res) => {
  const Profesor = await servicio_profesor.ObtenerTodosProfesores();
  const Actividad = await servicio_actividad.ObtenerTodasActividades();

  res.render("ClasesADM/Nueva-Clase", { Profesor, Actividad });
};

controlador.CrearNuevaClase = async (req, res) => {

  const { affectedRows } = await servicio.AñadirClase(req.body);

  if (affectedRows && affectedRows != 0) {
    req.flash("success_msg", "Clase agregada correctamente");
  } else {
    req.flash("Error_msg", "Error al agragar la clase");
  }

  res.redirect("/Clases/listar");
};

//Listar Clase
controlador.Listar_Clases = async (req, res) => {
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

  res.render("ClasesADM/Listar-Clases", { Clases });
};

//Editar Clases
controlador.RenderEditFormClase = async (req, res) => {
  const { ID_Clase } = req.params;
  let Clase = await servicio.ObtenerClasePorId(ID_Clase);

  let { NUE, ID_Actividad } = Clase[0];

  const Actividad = await servicio_actividad.ObtenerActividadesPorId(ID_Actividad);
  const Profesor = await servicio_profesor.ObtenerProfesoresPorId(NUE);

  let { Nombre, Primer_Apellido, Segundo_Apellido } = Profesor[0];
  let { Nombre_Actividad } = Actividad[0];

  Clase[0].NombreP = Nombre;
  Clase[0].ApellidoP = Primer_Apellido;
  Clase[0].ApellidoM = Segundo_Apellido;
  Clase[0].Nombre_ActividadA = Nombre_Actividad;
  Clase[0].Fecha = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "short",
  }).format(Clase[0].Fecha);

  let dia = Clase[0].Fecha.substring(0, 2);
  let mes = Clase[0].Fecha.substring(3, 5);
  let año = Clase[0].Fecha.substring(6, 8);

  let nuevaFecha = `20${año}-${mes}-${dia}`;
  Clase[0].Fecha = nuevaFecha;

  const Profesores = await servicio_profesor.ObtenerTodosProfesores();
  const Actividades = await servicio_actividad.ObtenerTodasActividades();

  for (let i = 0; Profesores.length; i++) {
    if (Profesores[i].NUE == Clase[0].NUE) {
      let profEliminado = Profesores.splice(i, 1);
      break;
    }
  }

  for (let i = 0; i < Actividad.length; i++) {
    if (Actividades[i].ID_Activiad == Clase[0].ID_Activiad) {
      let actEliminada = Actividades.splice(i, 1);
      break;
    }
  }

  res.render("ClasesADM/Edit-Clases", { Clase: Clase[0], Profesores, Actividades, });
};

controlador.EditarClase = async (req, res) => {
  
  const { ID_Clase } = req.params;
  const {
    Nombre_Clase,
    NUE,
    Locacion,
    Fecha,
    Horario,
    Cupo,
    Descripcion,
    ID_Actividad,
  } = req.body;
  const datos = {
    Nombre_Clase,
    NUE,
    Locacion,
    Fecha,
    Horario,
    Cupo,
    Descripcion,
    ID_Actividad,
    ID_Clase,
  };

  const resultado = await servicio.ActuzalizarClase(datos);
  const { affectedRows } = resultado;

  if (affectedRows && affectedRows != 0) {
    req.flash("success_msg", "Clase editada correctamente");
  } else {
    req.flash("Error_msg", "Error al editar la clase");
  }

  res.redirect("/Clases/listar");
};

//Eliminar Clase
controlador.EliminarClase = async (req, res) => {
  const { ID_Clase } = req.params;
  const result = await servicio.EliminarClase(ID_Clase);

  const { affectedRows } = result;
  if (affectedRows && affectedRows != 0) {
    req.flash("success_msg", "Clase eliminada correctamente");
  } else {
    req.flash("Error_msg", "Error al eliminar la clase");
  }

  res.redirect("/Clases/listar");
};

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
