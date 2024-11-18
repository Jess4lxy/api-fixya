import ResidentUser from "../models/residentUser.js";
import db from '../data/database.js';

const ResidentUserRepository = {
    // Crear un nuevo usuario de residente
    async createResidentUser(residentId, username, email, password) {
        try {
            const query = `
                INSERT INTO ResidentUser (idResident, username, email, password)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `;
            const { rows } = await db.query(query, [residentId, username, email, password]);
            if (!rows.length) {
                throw new Error('No se pudo insertar el usuario residente');
            }
            const row = rows[0];

            console.log('Consulta SQL con datos:', residentId, username, email, password);

            return new ResidentUser(row.id, row.idResident, row.username, row.email, row.password);
        } catch (error) {
            console.error('Error al crear el usuario residente:', error.message);
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    },

    // Obtener un usuario por su ID
    async getResidentUserById(id) {
        try {
            const query = `
                SELECT * FROM ResidentUser WHERE id = $1
            `;
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            const row = rows[0];
            return new ResidentUser(row.id, row.idResident, row.username, row.email, row.password);
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    },

    // Obtener un usuario por su correo electrónico
    async getResidentUserByEmail(email) {
        try {
            const query = `
                SELECT * FROM ResidentUser WHERE email = $1
            `;
            const { rows } = await db.query(query, [email]);
            if (rows.length === 0) {
                return null; // Devuelve null si no encuentra el usuario
            }
            const row = rows[0];
            return new ResidentUser(row.id, row.idResident, row.username, row.email, row.password);
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    },

    // Actualizar los datos de un usuario
    async updateResidentUser(id, username, email, password) {
        try {
            const query = `
                UPDATE ResidentUser
                SET username = $2, email = $3, password = $4
                WHERE id = $1
                RETURNING *
            `;
            const { rows } = await db.query(query, [id, username, email, password]);
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            const row = rows[0];
            return new ResidentUser(row.id, row.idResident, row.username, row.email, row.password);
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    },

    // Eliminar un usuario por su ID
    async deleteResidentUser(id) {
        try {
            const query = `
                DELETE FROM ResidentUser WHERE id = $1 RETURNING *
            `;
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            return { message: 'Usuario eliminado exitosamente' };
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }
};

export default ResidentUserRepository;
