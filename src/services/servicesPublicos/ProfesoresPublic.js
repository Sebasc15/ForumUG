const { resp } = require("express");
const pool = require("../../database");

class Profesor_Servicio_public{
  constructor() {}

  async ObtenerTodosProfesores() {
    let consultaBase = "SELECT * FROM profesor";
    const resultado = await pool.query(consultaBase);
    try {
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
  
}

module.exports = Profesor_Servicio_public;
