const {check} = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateID_Clase = [ 
    check('ID_Clase')
        .exists()
        .isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = {validateID_Clase};