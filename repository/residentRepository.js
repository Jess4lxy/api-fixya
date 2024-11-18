import Resident from '../models/resident.js';
import db from '../data/database.js';

const ResidentRepository = {
    // Obtener el total de residentes
    async getTotalResidents() {
        try {
            const query = 'SELECT COUNT(*) FROM Resident';
            const { rows } = await db.query(query);
            return parseInt(rows[0].count, 10); // Convertir el conteo a un número entero
        } catch (error) {
            throw new Error(`Error al obtener el total de residentes: ${error.message}`);
        }
    },

    // Obtener todos los residentes
    async getAllResidents({ limit = 50, offset = 0 }) {
        try {
            const query = 'SELECT * FROM Resident LIMIT $1 OFFSET $2';
            const { rows } = await db.query(query, [limit, offset]);
            return rows.map(row => new Resident(row.id, row.idapartment, row.numregister, row.identification, row.name));
        } catch (error) {
            throw new Error(`Error al obtener todos los residentes: ${error.message}`);
        }
    },

    // Obtener un residente por su ID
    async getResidentById(id) {
        try {
            const query = 'SELECT * FROM Resident WHERE id = $1';
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Resident(row.id, row.idapartment, row.numregister, row.identification, row.name);
        } catch (error) {
            throw new Error(`Error al obtener residente por ID: ${error.message}`);
        }
    },

    // Obtener residentes por ID de departamento
    async getResidentsByApartment(idApartment) {
        try {
            const query = 'SELECT * FROM Resident WHERE idapartment = $1';
            const { rows } = await db.query(query, [idApartment]);
            if (rows.length === 0) {
                return [];
            }
            return rows.map(row => new Resident(row.id, row.idapartment, row.numregister, row.identification, row.name));
        } catch (error) {
            throw new Error(`Error al obtener residentes por departamento: ${error.message}`);
        }
    },

    // Crear un nuevo residente
    async createResident({ idApartment, numRegister, identification, name }) {
        try {
            const query = `
                INSERT INTO Resident (idApartment, numRegister, identification, name)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `;
            const { rows } = await db.query(query, [idApartment, numRegister, identification, name]);
            const row = rows[0];
            return new Resident(row.id, row.idapartment, row.numregister, row.identification, row.name);
        } catch (error) {
            throw new Error(`Error al crear residente: ${error.message}`);
        }
    },

    // Actualizar un residente existente
    async updateResident(id, { idApartment, numRegister, identification, name }) {
        try {
            const query = `
                UPDATE Resident
                SET idApartment = $1, numRegister = $2, identification = $3, name = $4
                WHERE id = $5
                RETURNING *
            `;
            const { rows } = await db.query(query, [idApartment, numRegister, identification, name, id]);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Resident(row.id, row.idapartment, row.numregister, row.identification, row.name);
        } catch (error) {
            throw new Error(`Error al actualizar residente: ${error.message}`);
        }
    },

    // Eliminar un residente
    async deleteResident(id) {
        try {
            const query = 'DELETE FROM Resident WHERE id = $1 RETURNING *';
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Resident(row.id, row.idapartment, row.numregister, row.identification, row.name);
        } catch (error) {
            throw new Error(`Error al eliminar residente: ${error.message}`);
        }
    },
};

export default ResidentRepository;
