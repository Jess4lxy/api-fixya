import Resident from '../models/resident.js';
import db from '../data/database.js';

const ResidentRepository = {
    // Obtener todos los residentes
    async getAllResidents() {
        const query = 'SELECT * FROM Residente';
        const { rows } = await db.query(query);
        return rows.map(row => new Resident(row.id, row.iddepartamento, row.numregistro, row.identificacion, row.nombre));
    },

    // Obtener un residente por su ID
    async getResidentById(id) {
        const query = 'SELECT * FROM Residente WHERE ID = $1';
        const { rows } = await db.query(query, [id]);
        if (rows.length === 0) {
            return null;
        }
        const row = rows[0];
        return new Resident(row.id, row.iddepartamento, row.numregistro, row.identificacion, row.nombre);
    },

    // Obtener residentes por ID de departamento
    async getResidentsByDepartment(departmentId) {
        const query = 'SELECT * FROM Residente WHERE IDDepartamento = $1';
        const { rows } = await db.query(query, [departmentId]);
        if (rows.length === 0) {
            return [];
        }
        return rows.map(row => new Resident(row.id, row.iddepartamento, row.numregistro, row.identificacion, row.nombre));
    },

    // Crear un nuevo residente
    async createResident({ idDepartamento, numRegistro, identificacion, nombre }) {
        const query = `
        INSERT INTO Residente (IDDepartamento, numRegistro, identificacion, nombre)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;
        const { rows } = await db.query(query, [idDepartamento, numRegistro, identificacion, nombre]);
        const row = rows[0];
        return new Resident(row.id, row.iddepartamento, row.numregistro, row.identificacion, row.nombre);
    },

    // Actualizar un residente existente
    async updateResident(id, { idDepartamento, numRegistro, identificacion, nombre }) {
        const query = `
        UPDATE Residente
        SET IDDepartamento = $1, numRegistro = $2, identificacion = $3, nombre = $4
        WHERE ID = $5
        RETURNING *
        `;
        const { rows } = await db.query(query, [idDepartamento, numRegistro, identificacion, nombre, id]);
        if (rows.length === 0) {
            return null;
        }
        const row = rows[0];
        return new Resident(row.id, row.iddepartamento, row.numregistro, row.identificacion, row.nombre);
    },

    // Eliminar un residente
    async deleteResident(id) {
        const query = 'DELETE FROM Residente WHERE ID = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        if (rows.length === 0) {
            return null;
        }
        const row = rows[0];
        return new Resident(row.id, row.iddepartamento, row.numregistro, row.identificacion, row.nombre);
    },
};

export default ResidentRepository;
