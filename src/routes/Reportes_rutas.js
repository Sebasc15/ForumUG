const { Router } = require("express");
const router = Router();
const {isAuthenticatedADM} = require('../helpers/auth');

//Validacion para el parametro ID_Clase
const {validateID_Clase} = require('../validators/validateID_Clase');

const {
    Actividades,
    RenderReporte
  } = require("../controllers/controlador.reportes");


//Crear Actividad
router.get("/Reportes/Lista", isAuthenticatedADM, Actividades);

router.get("/Reportes/:ID_Clase", isAuthenticatedADM, validateID_Clase, RenderReporte);


module.exports = router;