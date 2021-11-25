const {check} = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateCreate = [
    check('NUA')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom((value, { req }) => {
            if (value.length != 6) {
                throw new Error('El NUA debe contener 6 digitos');
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
    check('ConfirContraseña')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({max: 60})
        .custom((value, { req }) => {
            if (value !== req.body.Contraseña) {
                throw new Error('La contraseña de confirmacion no coincide con la contraseña');
            }
                return true;
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]; 

module.exports = {validateCreate};