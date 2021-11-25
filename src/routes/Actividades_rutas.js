const { Router } = require("express");
const router = Router();
const {isAuthenticatedADM} = require('../helpers/auth');

//Validacion para el parametro ID_Actividad
const {validateID_Actividad} = require('../validators/validateID_Actividad');
//Validacion para la creacion de la actividad
const {validateActividad} = require('../validators/Actividad');

const {
  RenderActividadForm,
  CrearNuevaActividad,
  Listar,
  RenderEditForm,
  EditarActividad,
  EliminarActividad,
} = require("../controllers/controlador.actividades");

//Crear Actividad
router.get("/Actividades/Agregar", isAuthenticatedADM, RenderActividadForm);
router.post("/Actividades/Guardar_actividad", isAuthenticatedADM, validateActividad, CrearNuevaActividad);

//Mostrar Actividades
router.get("/Actividades/listar", isAuthenticatedADM, Listar);

//Editar actividades
router.get("/Actividades/listar/:ID_Actividad", isAuthenticatedADM, validateID_Actividad, RenderEditForm);
router.post("/Actividades/edit/:ID_Actividad", isAuthenticatedADM, validateID_Actividad, validateActividad, EditarActividad);

//Eliminar Activiades
router.get("/Actividades/eliminar/:ID_Actividad", isAuthenticatedADM, validateID_Actividad, EliminarActividad);

module.exports = router;
