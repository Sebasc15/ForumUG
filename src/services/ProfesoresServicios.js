const { resp } = require("express");
const pool = require("../database");

class Profesor_Servicio {
  constructor() {}

  async ObtenerTodosProfesores() {
    let consultaBase = "SELECT * FROM profesor";
    
    try {
      const resultado = await pool.query(consultaBase);
      return resultado;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async ObtenerProfesoresPorId(NUE) {
    let consultaBase = "SELECT * FROM profesor WHERE NUE = ? ";
    let Value = [NUE];
    try {
      const Profesor = await pool.query(consultaBase, Value);
      return Profesor;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async AñadirProfesor(nuevoProfesor) {
    let nuevoProfesorQuery =
        "INSERT INTO profesor (NUE, Nombre, Primer_Apellido, Segundo_Apellido, Correo)" +
        "VALUES (?, ?, ?, ?, ?)";

        console.log(nuevoProfesor);
      const validarNUE = await this.ObtenerProfesoresPorId(nuevoProfesor.NUE);
      if(validarNUE.length != 0) {
        return "NUE en uso";
      }
      var Datos = [
        nuevoProfesor.NUE,
        nuevoProfesor.Nombre,
        nuevoProfesor.Primer_Apellido,
        nuevoProfesor.Segundo_Apellido,
        nuevoProfesor.Correo,
      ];

    try {
      var GuardarResultado = await pool.query(nuevoProfesorQuery, Datos);
      return GuardarResultado;
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  }

  async ActuzalizarProfesor(NuevosDatos) {
    let Clasificacionquery =
      "UPDATE profesor SET Nombre = ?, Primer_Apellido = ?, Segundo_Apellido = ?, Correo = ? WHERE NUE = ? ";

    var Datos = [
      NuevosDatos.Nombre,
      NuevosDatos.Primer_Apellido,
      NuevosDatos.Segundo_Apellido,
      NuevosDatos.Correo,
      NuevosDatos.NUE,
    ];
    let result = null;
    try{
      result = await pool.query(Clasificacionquery, Datos);
      return result;
    }catch(error){
      console.log(e);
      return "Error";
    }
  }

  async EliminarProfesor(NUE) {
    let Clasificacionquery = "DELETE FROM profesor WHERE NUE = ? ";
    let Value = [NUE];
    try {
      const result = await pool.query(Clasificacionquery, Value);
      return result;
    } catch (e) {
      console.log(e);
      return "Error";
    }
  }
}

module.exports = Profesor_Servicio;
