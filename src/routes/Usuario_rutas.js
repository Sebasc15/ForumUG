const { Router } = require("express");
const router = Router();
const passport = require('passport');
const {validateCreate} = require('../validators/Estudiante');

const {
    renderSignUpForm,
    renderSignInForm,
    signup,
    signin,
    logout,
    renderADMSignupForm
} = require('../controllers/controlador_usuarios');

router.get('/Estudiante/signup', renderSignUpForm);

router.post('/Estudiante/signup', validateCreate, async (req, res, next) =>{

    const result = await signup(req, res);
    
    if(result=='OK'){
        passport.authenticate('local.signup',{
            successRedirect: '/Perfil',
            failureRedirect: '/Estudiante/signup',
            passReqToCallback: true
        })(req, res, next);
    }
});

router.get('/Estudiante/signin', renderSignInForm);

router.post('/Estudiante/signin', async (req, res, next) =>{

    const result = await signin(req, res);
    
    if(result=='OK'){
        passport.authenticate('local.signin',{
            successRedirect: '/Perfil',
            failureRedirect: '/Estudiante/signin',
            passReqToCallback: true
        })(req, res, next);
    }
    if(result=='OKADM'){
        passport.authenticate('local.adm.signin',{
            successRedirect: '/Perfil',
            failureRedirect: '/Estudiante/signin',
            passReqToCallback: true
        })(req, res, next);
    }
});

/*
router.get('/ADMN/signup', renderADMSignupForm);

router.post('/ADMN/signup', async(req, res, next)=>{
    passport.authenticate('local.adm.signup',{
        successRedirect: '/Perfil',
        failureRedirect: '/ADMN/signup',
        passReqToCallback: true
    })(req, res, next);
});
*/

router.get('/Estudiante/logout', logout);

module.exports = router;