const {check} = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateNUE = [ 
    check('NUE')
        .exists()
        .isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = {validateNUE};