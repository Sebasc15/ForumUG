const {check} = require('express-validator');
const { validateResult } = require('../helpers/validateADM');

const validateProfesor = [
    check('NUE')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom((value, { req }) => {
            if (value.length != 6) {
                throw new Error('El NUE debe contener 6 digitos');
            }
            return true;
        }),
    check('Nombre')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({max: 60}),
    check('Primer_Apellido')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({max: 60}),
    check('Segundo_Apellido')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({max: 60}),
    check('Correo')
        .exists()
        .not()
        .isEmpty()
        .isEmail()
        .isLength({max: 60}),
    (req, res, next) => {
        validateResult(req, res, next, 3);
    }
]; 

module.exports = {validateProfesor};