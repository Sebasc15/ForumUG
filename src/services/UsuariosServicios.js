const pool = require("../database");
const bcrypt = require('bcryptjs');

class Usuarios_servicios {
    constructor() {}

    async BuscarUsuarioNUA(NUA){
        let consultaBase = "SELECT * FROM estudiante WHERE NUA = ?";
        let datos=[
            NUA
        ];
        try {
            const resultado = await pool.query(consultaBase, datos);
            return resultado;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
/*
    async AñadirEstudiante(nuevoEstudiante) {
        let consultabase =
            "INSERT INTO estudiante (NUA, Nombre, Primer_Apellido, Segundo_Apellido, Correo, Contraseña)" +
            "VALUES (?, ?, ?, ?, ?, ?)";
    
          var Datos = [
            nuevoEstudiante.NUA,
            nuevoEstudiante.Nombre,
            nuevoEstudiante.Primer_Apellido,
            nuevoEstudiante.Segundo_Apellido,
            nuevoEstudiante.Correo,
            nuevoEstudiante.Contraseña,
          ];
    
        try {
          var GuardarResultado = await pool.query(consultabase, Datos);
          return GuardarResultado;
        } catch (error) {
          console.log("Error: ", error);
          return error;
        }
    }
*/
    async Buscaradmin(NUE){
      let consultaBase = "SELECT * FROM admin WHERE NUE = ?";
        let datos=[
            NUE
        ];

        try {
            const resultado = await pool.query(consultaBase, datos);
            return resultado;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = Usuarios_servicios;