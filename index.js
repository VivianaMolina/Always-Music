const { Pool } = require("pg");
const { database } = require('pg/lib/defaults');
const argumentos = process.argv.slice(1);

const config = {
    host: "localhost",
    port: 5432,
    database: "alwaysmusic",
    user: "postgres",
    password: "1234",
};
const pool = new Pool(config);

//1. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
const insertstudents = async () => {
    try {
        const text = "insert into students (nombre, rut, curso, nivel) values ($1, $2, $3, $4)";
        const values = ["Viviana Molina", "15.440.720-0", "Math", "10"];
        const response = await pool.query(text, values);
        console.log(response);

    } catch (error) {
        console.error('Error al insertar el registro:', error.message);
        throw error;
    } 
};
insertstudents();

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
    } 
}

const rutStudent = String(argumentos[1]);
getStudentRecordbyRut(rutStudent);


// 3. Crear una función asíncrona para obtener por consola todos los estudiantes registrados
const getRegisteredStudents= async () => {
    try {
        const registro = await pool.query("SELECT * FROM students");

        // Muestra el registro por consola
        console.log('Los estudiates registrados son:', registro);
    } catch (error) {
        console.error('Error al obtener los registros:', error.message);
        throw error;
    }
}

getRegisteredStudents();

// 4. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
const updateStudent= async () => {
    try {
        const text = "UPDATE students SET nombre = $2, rut = $3, curso = $4, nivel = $5 where id = $1";
        const values = [1, "Ema", "12.456.987-2", "science", "4"];

        const registro = await pool.query(text, values);

        // Muestra el registro por consola
        console.log('Actualización del estudiante:', registro);
    } catch (error) {
        console.error('Error al actualizar el registro:', error.message);
        throw error;
    } 
}

updateStudent();

// 5. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
const deleteStudent= async () => {
    try {
        const text = "DELETE FROM students where id = $1";
        const values = [2];

        const registro = await pool.query(text, values);

        // Muestra el registro por consola
        console.log('Se elimino al estudiante:', registro);
    } catch (error) {
        console.error('Error al eliminar el registro:', error.message);
        throw error;
    } finally {
        pool.end();
    }
}

deleteStudent();