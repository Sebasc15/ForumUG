const { resp } = require("express");
const pool = require("../database");

class Clase_Servicio {
  constructor() {}

  async ObtenerTodasClases() {
    let consultaBase = "SELECT * FROM clase";
    try {
      const resultado = await pool.query(consultaBase);
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

  async AñadirClase(nuevaClase) {
    let nuevaActividadQuery =
      "INSERT INTO clase (Nombre_Clase, NUE, Locacion, Fecha, Horario, Cupo, Descripcion, ID_Actividad)" +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    var Datos = [
      nuevaClase.Nombre_Clase,
      nuevaClase.NUE,
      nuevaClase.Locacion,
      nuevaClase.Fecha,
      nuevaClase.Horario,
      nuevaClase.Cupo,
      nuevaClase.Descripcion,
      nuevaClase.ID_Actividad,
    ];

    try {
      var GuardarResultado = await pool.query(nuevaActividadQuery, Datos);
      return GuardarResultado;
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  }

  async ActuzalizarClase(NuevosDatos) {
    let Clasificacionquery =
      "UPDATE clase SET Nombre_Clase = ?, NUE = ?, Locacion = ?, Fecha = ?, Horario = ?, Cupo = ?, Descripcion = ?, ID_Actividad = ? WHERE ID_Clase = ? ";

    var Datos = [
      NuevosDatos.Nombre_Clase,
      NuevosDatos.NUE,
      NuevosDatos.Locacion,
      NuevosDatos.Fecha,
      NuevosDatos.Horario,
      NuevosDatos.Cupo,
      NuevosDatos.Descripcion,
      NuevosDatos.ID_Actividad,
      NuevosDatos.ID_Clase,
    ];
    let result = null;
    try {
      result = await pool.query(Clasificacionquery, Datos);
      return result;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }

  async EliminarClase(ID_Clase) {
    let Clasificacionquery = "DELETE FROM clase WHERE ID_Clase = ? ";
    let Value = [ID_Clase];
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

module.exports = Clase_Servicio;
