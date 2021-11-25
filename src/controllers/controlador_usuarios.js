const controlador_usuarios = {}
const Estudiante_Serivicio = require('../services/UsuariosServicios');
const controlador = require('./controlador');
const servicio = new Estudiante_Serivicio();

controlador_usuarios.renderSignUpForm = (req, res) => {
    res.render('Usuarios/SignUp');
}

controlador_usuarios.signup = async (req, res) =>{
    let errors = [];
    const {NUA, Nombre, Primer_Apellido, Segundo_Apellido, Correo} = req.body;

    const buscarNUA = await servicio.BuscarUsuarioNUA(NUA);
    if(buscarNUA.length !=0){
        errors.push({text:'El NUA ingresado ya esta en uso'});
        res.render('Usuarios/SignUp', {errors,Nombre,Primer_Apellido,Segundo_Apellido,Correo});
    }else{
        return 'OK';
    } 
}


controlador_usuarios.renderSignInForm = (req, res) =>{
    res.render('Usuarios/SignIn');
}

controlador_usuarios.signin = async (req, res) =>{
    errors = [];
    const {NUA} = req.body;
    const buscarADMIN = await servicio.Buscaradmin(NUA);
    if(buscarADMIN.length!=0){
        for(let i=0; i<buscarADMIN.length; i++){
            if(buscarADMIN[i].NUE==NUA){
                return 'OKADM'
            }
        }
    };
    const buscarNUA = await servicio.BuscarUsuarioNUA(NUA);
    if(buscarNUA.length == 0){
        errors.push({text:'El NUA ingresado no existe'});
        res.render('Usuarios/SignIn', {errors});
    }else{
        return 'OK';
    };
}


controlador_usuarios.logout = (req, res) =>{
    delete req.session.rol;
    req.logout();
    req.flash('success_msg', 'Sesión cerrada correctamente');
    res.redirect('/Estudiante/signin');
}

controlador_usuarios.renderADMSignupForm = (req, res)=>{
    res.render('Usuarios/ADMSignUp');
}

module.exports = controlador_usuarios;