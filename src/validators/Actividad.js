const {check} = require('express-validator');
const { validateResult } = require('../helpers/validateADM');

const validateActividad = [
    check('Nombre_Actividad')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({max: 60}),
    (req, res, next) => {
        validateResult(req, res, next, 1);
    }
]; 

module.exports = {validateActividad};