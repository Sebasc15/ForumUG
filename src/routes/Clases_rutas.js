const { Router } = require("express");
const router = Router();
const {isAuthenticatedADM} = require('../helpers/auth');

//Validacion para el parametro ID_Clase
const {validateID_Clase} = require('../validators/validateID_Clase');
//Validacion para la creacion de la clase
const {validateClase} = require('../validators/Clase');

const {
  RenderClaseForm,
  CrearNuevaClase,
  Listar_Clases,
  RenderEditFormClase,
  EditarClase,
  EliminarClase,
} = require("../controllers/controlador.clases");

//Crear Actividad
router.get("/Clases/Agregar", isAuthenticatedADM, RenderClaseForm);
router.post("/Clases/Guardar_clase", isAuthenticatedADM, validateClase, CrearNuevaClase);

//Mostrar Actividades
router.get("/Clases/listar", isAuthenticatedADM, Listar_Clases);

//Editar actividades
router.get("/Clases/listar/:ID_Clase", isAuthenticatedADM, validateID_Clase, RenderEditFormClase);
router.post("/Clases/edit/:ID_Clase", isAuthenticatedADM, validateID_Clase, validateClase, EditarClase);

//Eliminar Activiades
router.get("/Clases/eliminar/:ID_Clase", isAuthenticatedADM, validateID_Clase, EliminarClase);

module.exports = router;