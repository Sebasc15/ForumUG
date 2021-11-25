const { resp } = require("express");
const pool = require("../../database");

class Actividad_Servicio_public {
  constructor() {}

  async ObtenerTodasActividades() {
    try {
      let consultaBase = "SELECT * FROM actividad ";
      const resultado = await pool.query(consultaBase);
      return resultado;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async ObtenerActividadesPorId(ID_Activiad) {
    try {
      let consultaBase = "SELECT * FROM actividad WHERE ID_Actividad = ? ";
      let Value = [ID_Activiad];
      const Actividad = await pool.query(consultaBase, Value);
      return Actividad;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = Actividad_Servicio_public;