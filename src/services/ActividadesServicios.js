const { resp } = require("express");
const pool = require("../database");

class Actividad_Servicio {
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

  async AnadirActividad(nuevaActividad) {
    try {
      let nuevaActividadQuery =
        "INSERT INTO actividad (Nombre_Actividad)" + "VALUES (?)";

      var Datos = [nuevaActividad.Nombre_Actividad];

      var GuardarResultado = await pool.query(nuevaActividadQuery, Datos);
      return GuardarResultado;
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  }

  async ActuzalizarActividad(Datos) {
    let Clasificacionquery =
      "UPDATE actividad SET Nombre_Actividad = ? WHERE ID_Actividad = ? ";

    var Actividad = [Datos.Nombre_Actividad, Datos.ID_Actividad];

    try{
      const dat = await pool.query(Clasificacionquery, Actividad);
      return dat;
    }catch(e){
      console.log(e);
      return "Error";
    }
  }

  async EliminarActividad(ID_Actividad) {
    let Clasificacionquery = "DELETE FROM actividad WHERE ID_Actividad = ? ";
    let Value = [ID_Actividad];
    var result = null;
    try {
      result = await pool.query(Clasificacionquery, Value);
      return result;
    } catch (e) {
      console.log(e);
      return "Error";
    }
  }
}

module.exports = Actividad_Servicio;
