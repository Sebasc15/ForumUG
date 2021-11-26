const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../helpers/encrypt');

//Admin
/*
passport.use('local.adm.signup', new LocalStrategy({
    usernameField: 'NUE',
    passwordField: 'Contraseña',
    passReqToCallback: true
}, async (req, NUE, Contraseña, done) =>{
    const {Nombre, Correo} = req.body;
    const newadmin = {
        NUE, Nombre, Contraseña, Correo
    }
    newadmin.Contraseña = await helpers.encryptPassword(Contraseña);
    const result = await pool.query('INSERT INTO admin SET ?', [newadmin]);
    //req.session.rol = 'Admin';
    const usuario = req.user;
    return done(null, usuario);
}));
*/

passport.use('local.adm.signin', new LocalStrategy({
    usernameField: 'NUA',
    passwordField: 'Contraseña',
    passReqToCallback: true
}, async(request, NUA, Contraseña, done)=>{
    const rows = await pool.query('SELECT * FROM admin WHERE NUE = ? ', [NUA]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(Contraseña, user.Contraseña);
        if(validPassword){
            request.session.rol = 'Admin';
            done(null, user, request.flash('success_msg','Bienvenido ' + user.Nombre));
        }else{
            done(null, false, request.flash('Error_msg','Contraseña incorrecta'));
        }
    }else {
        return done(null, false, request.flash('Error_msg', 'El NUA no existe'));
    }
}));




//Estudiante
passport.use('local.signin', new LocalStrategy({
    usernameField: 'NUA',
    passwordField: 'Contraseña',
    passReqToCallback: true
}, async(request, NUA, Contraseña, done)=>{

    const rows = await pool.query('SELECT * FROM estudiante WHERE NUA = ? ', [NUA]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(Contraseña, user.Contraseña);
        if(validPassword){
            request.session.rol = 'Estudiante';
            done(null, user, request.flash('success_msg','Bienvenido ' + user.Nombre));
        }else{
            done(null, false, request.flash('Error_msg','Contraseña incorrecta'));
        }
    } else {
        return done(null, false, request.flash('Error_msg', 'El NUA no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'NUA',
    passwordField: 'Contraseña',
    passReqToCallback: true
}, async (request, NUA, Contraseña, done)=>{

    const { Nombre, Primer_Apellido, Segundo_Apellido, Correo } = request.body;
    const newUser = {
        NUA,
        Nombre,
        Primer_Apellido,
        Segundo_Apellido,
        Correo,
        Contraseña
    };
    newUser.Contraseña = await helpers.encryptPassword(Contraseña);
    const result = await pool.query('INSERT INTO estudiante SET ?', [newUser]);
    request.session.rol = 'Estudiante';
    return done(null, newUser);
}));




passport.serializeUser((req, user, done) =>{
    try{
        if(req.session.rol=='Estudiante'){
            done(null, user.NUA);
        }else{
            done(null, user.NUE);
        }
    }catch(e){
        console.log(e)
    }
});

passport.deserializeUser( async (req, NUA, done)=>{
    try{
        if(req.session.rol=='Estudiante'){
            pool.query('SELECT * FROM estudiante WHERE NUA = ?', [NUA], function(err, user){
                done(err, user);
            });
        }else{
            pool.query('SELECT * FROM admin WHERE NUE = ?', [NUA], function(err, user){
                done(err, user);
            });
        }
    }catch(e){
        console.log(e);
    }
});