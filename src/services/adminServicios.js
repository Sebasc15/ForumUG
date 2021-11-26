const { resp } = require("express");
const pool = require("../database");
const helpers = require('../helpers/encrypt');

class Clase_admin {
    constructor() {}

    async registrar(req, res) {
        const {NUE, Nombre, Contraseña, Correo} = req.body;
        const newadmin = {
            NUE, Nombre, Contraseña, Correo
        }
        newadmin.Contraseña = await helpers.encryptPassword(Contraseña);
      try {
        const result = await pool.query('INSERT INTO admin SET ?', [newadmin]);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    }

}

module.exports = Clase_admin;