const bcrypt = require('bcryptjs');
const helpers = {};


helpers.encryptPassword = async (Contraseña) =>{
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(Contraseña, salt);
};

helpers.matchPassword = async (Contraseña, contraseñaGuardada) => {
    try{
        return await bcrypt.compare(Contraseña, contraseñaGuardada);
    }catch(e){
        console.log(e);
    }
};

module.exports = helpers;