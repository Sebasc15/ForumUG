const { Router } = require("express");
const router = Router();
const {isAuthenticatedADM} = require('../helpers/auth');

//Validacion para el parametro NUE
const {validateNUE} = require('../validators/validateNUE');
//Validacion para los profesores
const {validateProfesor} = require('../validators/Profesores');

const {
  RenderProfesorForm,
  CrearNuevoProfesor,
  Listar_Profesores,
  RenderEditFormProfesor,
  EditarProfesor,
  EliminarProfesor,
} = require("../controllers/controlador.profesor");

//Crear Profesor
router.get("/Profesor/Agregar", isAuthenticatedADM, RenderProfesorForm);
router.post("/Profesor/Guardar_profesor", isAuthenticatedADM, validateProfesor, CrearNuevoProfesor);

//Mostrar Profesores
router.get("/Profesor/listar", isAuthenticatedADM, Listar_Profesores);

//Editar Profesores
router.get("/Profesor/listar/:NUE", isAuthenticatedADM, validateNUE, RenderEditFormProfesor);
router.post("/Profesor/edit/:NUE", isAuthenticatedADM, validateNUE, validateProfesor, EditarProfesor);

//Eliminar Profesores
router.get("/Profesor/eliminar/:NUE", isAuthenticatedADM, validateNUE, EliminarProfesor);

module.exports = router;
