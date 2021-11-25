const {check} = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateID_Actividad = [ 
    check('ID_Actividad')
        .exists()
        .isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = {validateID_Actividad};