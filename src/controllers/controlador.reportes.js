const controlador = {};
const { req, res } = require("express");


const Clase_servicio = require("../services/servicesPublicos/ClasesPublic");
const servicio = new Clase_servicio();

const Profesor_Servicio = require("../services/servicesPublicos/ProfesoresPublic");
const servicio_profesor = new Profesor_Servicio();

const Actividad_Serivicio = require("../services/servicesPublicos/ActividadesPublic");
const servicio_actividad = new Actividad_Serivicio();

const Reportes = require("../services/ReportesServicios");
const reporte = new Reportes();


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

    res.render("ReporteClases/ReportesListarClases", { Clases });
};

controlador.RenderReporte = async (req, res) =>{
    const { ID_Clase } = req.params;
    let Clases = await servicio.ObtenerClasePorId(ID_Clase);
    
    const Estudiantes = await reporte.ObtenerDatos(ID_Clase);

    var Titulo = [{
            "Name": Clases[0].Nombre_Clase
    }]

    res.render("ReporteClases/Reporte", { Titulo, Estudiantes });
}











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

module.exports = controlador;