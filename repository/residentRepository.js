// repository/residentRepository.js
import db from '../data/database.js';

const ResidentRepository = {
    // Obtener todos los residentes
    async getAllResidents() {
        const query = 'SELECT * FROM Residente';
        const { rows } = await db.query(query);
        return rows;
    },

    // Obtener un residente por su ID
    async getResidentById(id) {
        const query = 'SELECT * FROM Residente WHERE ID = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    // Crear un nuevo residente
    async createResident({ idDepartamento, numRegistro, identificacion, nombre }) {
        const query = `
        INSERT INTO Residente (IDDepartamento, numRegistro, identificacion, nombre)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;
        const { rows } = await db.query(query, [idDepartamento, numRegistro, identificacion, nombre]);
        return rows[0];
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
        return rows[0];
    },

    // Eliminar un residente
    async deleteResident(id) {
        const query = 'DELETE FROM Residente WHERE ID = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },
};

export default ResidentRepository;
