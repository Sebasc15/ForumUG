const { resp } = require("express");
const pool = require("../database");


class Reportes{

    constructor() {}

    async ObtenerDatos(ID_Clase) {

        const Tabla = await ObtenerRegistros(ID_Clase);
        const estudiantes = await ObtenerAlumnos();

        var datos = [];
        for(var i=0; i<estudiantes.length; i++){
            
            if(Tabla.find(elemnto => elemnto.NUA === estudiantes[i].NUA)){
                datos.push({
                    NUA: estudiantes[i].NUA,
                    Nombre: estudiantes[i].Nombre,
                    Primer_Apellido: estudiantes[i].Primer_Apellido,
                    Segundo_Apellido: estudiantes[i].Segundo_Apellido
                })
            }
        }

        return datos;
    }

}


async function ObtenerRegistros(ID_Clase){
    let consultaBase = "SELECT * FROM clase_estudiante WHERE ID_Clase = ?";
    var datos = [
        ID_Clase
    ]
    try{
        const Resultado = await pool.query(consultaBase, datos);
        return Resultado;
    }catch(e){
        console.log(e);
        return e;
    }
}

async function ObtenerAlumnos(){
    let consultaBase = "SELECT * FROM estudiante";
    try{
        const Resultado = await pool.query(consultaBase);
        return Resultado;
    }catch(e){
        console.log(e);
        return e;
    }
}


module.exports = Reportes;