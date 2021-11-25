const {check} = require('express-validator');
const { validateResult } = require('../helpers/validateADM');

const validateClase = [
    check('Nombre_Clase')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({max: 60}),
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
    check('Locacion')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({max: 60}),
    check('Fecha')
        .exists()
        .not()
        .isEmpty()
        .isDate(),
    check('Horario')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({max: 60}),
    check('Cupo')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check('Descripcion')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({max: 120}),
    check('ID_Actividad')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),

    (req, res, next) => {
        validateResult(req, res, next, 2);
    }
]; 

module.exports = {validateClase};