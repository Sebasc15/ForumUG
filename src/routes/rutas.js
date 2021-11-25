const { Router } = require("express");
const router = Router();
const {isAuthenticated} = require('../helpers/auth');

//Validacion para el parametro ID_Clase
const {validateID_Clase} = require('../validators/validateID_Clase');


const {
  principal,
  Actividades,
  MisActividades,
  Perfil,
  ActividadesID,
  Registro,
  EliminarRegistroID
} = require("../controllers/controlador");

//Pagina Principal
router.get("/", principal);

//Actividades para los alumnos
router.get("/Actividades", Actividades);
router.get("/Actividades/public/:ID_Clase", isAuthenticated, validateID_Clase, ActividadesID);


//Pagina de control de actividades (Alumnos)
router.get("/MisActividades", isAuthenticated, MisActividades);
router.post("/MisActividades/:ID_Clase", isAuthenticated, validateID_Clase, EliminarRegistroID);

//Registrar usuario en la clase.
router.post("/Registro/:ID_Clase", isAuthenticated, validateID_Clase, Registro);

//Perfil de los usuarios
router.get("/Perfil", isAuthenticated, Perfil);

module.exports = router;