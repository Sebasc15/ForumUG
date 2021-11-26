const {check} = require('express-validator');
const { validateResult } = require('../helpers/validateuseradm');

const validateadm = [
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
    check('Correo')
        .exists()
        .not()
        .isEmpty()
        .isEmail()
        .isLength({max: 60}),
    check('Contraseña')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .custom((value, { req }) => {
            
            if (value.length < 8 || value.length > 60){
                throw new Error('La contraseña debe contener al menos 8 caracteres y como maximo 60');
            }
                return true;
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]; 

module.exports = {validateadm};