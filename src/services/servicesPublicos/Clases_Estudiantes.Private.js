const { resp } = require("express");
const pool = require("../../database");


class Clases_Estudiantes_Private{

    constructor() {}

    async Registro(ID_Clase, req) {
        if(req.user){

            const {NUA}=req.user[0];

            if(NUA){

                const Cupo= await ObtenerCupoClase(ID_Clase);
                const Registos= await ObtenerLosRegistrosClase_Estudiantes_x_Clase(ID_Clase);
                const val = Registos.length;

                if(val<Cupo){
                
                    for(let i=0;i<val;i++){
                        if(Registos[i].NUA==NUA){
                            return "Ya se encuentra registrado";
                        }
                    }

                    let consultaBase =
                    "INSERT INTO clase_estudiante (ID_Clase, NUA)" + "VALUES (?, ?)";
                    const datos = [
                        ID_Clase, NUA
                    ];
                    const query = await pool.query(consultaBase, datos);
                    
                    const {affectedRows}=query;
                    if(affectedRows!=0){
                        return "Registro Exitoso";
                    }else{
                        return "Error al Registrar";
                    }
                    
                }else{
                    return 'Cupo lleno';
                }
            }
            if(req.app.locals.admin){
                return 'El administrador no puede registrarse en las clases, porfavor ingrese con un usuario diferente';
            }
        }
    }



    async EliminarRegistro(ID_Clase, req) {
        
        const {NUA}=req.user[0];

        if(NUA){

            const Consulta = "DELETE FROM clase_estudiante WHERE ID_Clase = ? AND NUA = ?"

            const valores = [
                ID_Clase,
                NUA
            ]

            const query = await pool.query(Consulta, valores);

            const {affectedRows}=query;
            if(affectedRows!=0){
                return "Registro eliminado con exito";
            }else{
                return "Error al eliminar el registro";
            }
        }
        return 'Error al eliminar el registro'
    }












    async ObtenerClasesdeEstudiantes(req){
        if(req.user){

            const {NUA} = req.user[0];
            const Registros = await ObtenerClases_EstudianteporNUA(NUA);

            const ArrayClases = [];

            for(let i=0;i<Registros.length; i++){
                const clase = await ObtenerClases(Registros[i].ID_Clase);
                clase[0] = await Actividad_Profesor(clase[0]);
                ArrayClases.push(clase[0]);
            }
            
            let Ordenamiento = ArrayClases.sort((a, b) => a.ID_Clase - b.ID_Clase);

            Ordenamiento.forEach(element => {
                element.Fecha = new Intl.DateTimeFormat("es-ES", {
                    dateStyle: "short",
                }).format(element.Fecha);
            });

            return Ordenamiento;
        }
    }

}











async function ObtenerLosRegistrosClase_Estudiantes_x_Clase(ID_Clase){
    let consultaBase = "SELECT * FROM clase_estudiante WHERE ID_Clase = ?";
    const datos=[
        ID_Clase
    ];
    try{
        const Registros = await pool.query(consultaBase, datos);
        return Registros;
    }catch(e){
        console.log(e);
        return e;
    }
}





async function ObtenerCupoClase(ID_Clase){
    let consultaBase = "SELECT Cupo FROM clase WHERE ID_Clase = ?";
    const datos =[ID_Clase];

    try{
        const Resultado = await pool.query(consultaBase, datos);
        const {Cupo}=Resultado[0];
        return Cupo;
    }catch(e){
        console.log(e);
        return e;
    }
}





async function ObtenerClases_EstudianteporNUA(NUA){
    let consultaBase = "SELECT * FROM clase_estudiante WHERE NUA = ?";
    const datos=[
        NUA
    ];
    try{
        const Registros = await pool.query(consultaBase, datos);
        return Registros;
    }catch(e){
        console.log(e);
        return e;
    }
}




async function ObtenerClases(ID_clase){
    let consultaBase = "SELECT * FROM clase WHERE ID_Clase = ?";
    const datos=[
        ID_clase
    ];
    try{
        const Registros = await pool.query(consultaBase, datos);
        return Registros;
    }catch(e){
        console.log(e);
        return e;
    }
}





async function Actividad_Profesor(Registro){

    let consultaActividaes = "SELECT * FROM actividad WHERE ID_Actividad = ?"
    let consultaProfesores = "SELECT * FROM profesor WHERE NUE = ?"

    const {ID_Actividad, NUE} = Registro;
    
    const array1=[
        ID_Actividad
    ];
    const array2=[
        NUE
    ];

    let actividad = null;
    let profesor = null;
    try{
        actividad = await pool.query(consultaActividaes, array1);
        profesor = await pool.query(consultaProfesores, array2);
    }catch(e){
        console.log(e);
        return Registro;
    }
    
    const {Nombre_Actividad} = actividad[0];
    const {Nombre, Primer_Apellido, Segundo_Apellido} = profesor[0];


    Registro.Nombre_Actividad = Nombre_Actividad;
    Registro.NombreP = Nombre;
    Registro.PrimerAP = Primer_Apellido;
    Registro.SegundoAP = Segundo_Apellido;

    return Registro;
}

module.exports = Clases_Estudiantes_Private;