const { resp } = require("express");
const pool = require("../../database");

class Clase_Servicio_public{
    constructor() {}
  
    async ObtenerTodasClases() {
      let consultaBase = "SELECT * FROM clase";
      const resultado = await pool.query(consultaBase);
      try {
        return resultado;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  
    async ObtenerClasePorId(ID_Clase) {
      let consultaBase = "SELECT * FROM clase WHERE ID_Clase = ? ";
      let Value = [ID_Clase];
      try {
        const Clase = await pool.query(consultaBase, Value);
        return Clase;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  
  }
  
  module.exports = Clase_Servicio_public;