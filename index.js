const { Pool } = require("pg");
const { database } = require('pg/lib/defaults');
const argumentos = process.argv.slice(2);
const evento = String(argumentos[0]);
const nombre = String(argumentos[1]);
const rut = String(argumentos[2]);
const curso = String(argumentos[3]);
const nivel = String(argumentos[4]);

const config = {
    host: "localhost",
    port: 5432,
    database: "alwaysmusic",
    user: "postgres",
    password: "1234",
};
const pool = new Pool(config);


//1. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
const insertstudents = async (nombre, rut, curso, nivel) => {
    try {
        const text = "insert into students (nombre, rut, curso, nivel) values ($1, $2, $3, $4)";
        const values = [nombre, rut, curso, nivel];
        const response = await pool.query(text, values);
        console.log(`Estudiante ${nombre} agregado con éxito`, response);

    } catch (error) {
        console.error('Error al insertar el registro:', error.message);
        throw error;
    } finally {
        pool.end();
    }
};

// 2. Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
const getStudentRecordbyRut = async (rut) => {
    try {
        const text = "SELECT * FROM students where rut = $1";
        const values = [rut];

        const registro = await pool.query(text, values);

        // Muestra el registro por consola
        console.log('El estudiante seleccionado por rut es:', registro);
    } catch (error) {
        console.error('Error al obtener el registro:', error.message);
        throw error;
    } finally {
        pool.end();
    }
}

// 3. Crear una función asíncrona para obtener por consola todos los estudiantes registrados
const getRegisteredStudents = async () => {
    try {
        const registro = await pool.query("SELECT * FROM students");

        // Muestra el registro por consola
        console.log('registro actual', registro);
    } catch (error) {
        console.error('Error al obtener los registros:', error.message);
        throw error;
    } finally {
        pool.end();
    }
}

// 4. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
const updateStudent = async (nombre, rut, curso, nivel) => {
    try {
        const text = "UPDATE students SET nombre = $1, rut = $2, curso = $3, nivel = $4 where rut = $2";
        const values = [nombre, rut, curso, nivel];

        const registro = await pool.query(text, values);

        // Muestra el registro por consola
        console.log(`Estudiante ${nombre} editado con éxito`, registro);
    } catch (error) {
        console.error('Error al actualizar el registro:', error.message);
        throw error;
    } finally {
        pool.end();
    }
}

// 5. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
const deleteStudent = async (rut) => {
    try {
        const text = "DELETE FROM students where rut = $1";
        const values = [rut];

        const registro = await pool.query(text, values);

        // Muestra el registro por consola
        console.log(`Registro de estudiante con rut ${rut} eliminado`, registro);
    } catch (error) {
        console.error('Error al eliminar el registro:', error.message);
        throw error;
    } finally {
        pool.end();
    }
}

switch (evento) {
    case "nuevo":
        insertstudents(nombre, rut, curso, nivel);
        break;
    case "consulta":
        getRegisteredStudents();
        break;
    case "editar":
        updateStudent(nombre, rut, curso, nivel);
        break;
    case "rut":
        getStudentRecordbyRut(rut);
        break;
    case "eliminar":
        deleteStudent(rut);
        break;
    default:
        console.log("ingrese parametros validos");
}