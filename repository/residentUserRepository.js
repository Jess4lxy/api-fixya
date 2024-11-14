import ResidentUser from "../models/residentUser.js";
import db from '../data/database.js';

const ResidentUserRepository = {
    // Crear un nuevo usuario de residente
    async createResidentUser(residentId, username, email, password) {
        try {
            const query = `
                INSERT INTO UsuarioResidente (residentId, username, email, password)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `;
            const { rows } = await db.query(query, [residentId, username, email, password]);
            const row = rows[0];
            return new ResidentUser(row.id, row.residentId, row.username, row.email, row.password);
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    },

    // Obtener un usuario por su ID
    async getResidentUserById(id) {
        try {
            const query = `
                SELECT * FROM UsuarioResidente WHERE id = $1
            `;
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            const row = rows[0];
            return new ResidentUser(row.id, row.residentId, row.username, row.email, row.password);
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    },

    // Obtener un usuario por su correo electrónico
    async getResidentUserByEmail(email) {
        try {
            const query = `
                SELECT * FROM UsuarioResidente WHERE email = $1
            `;
            const { rows } = await db.query(query, [email]);
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            const row = rows[0];
            return new ResidentUser(row.id, row.residentId, row.username, row.email, row.password);
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    },

    // Actualizar los datos de un usuario
    async updateResidentUser(id, username, email, password) {
        try {
            const query = `
                UPDATE UsuarioResidente
                SET username = $2, email = $3, password = $4
                WHERE id = $1
                RETURNING *
            `;
            const { rows } = await db.query(query, [id, username, email, password]);
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            const row = rows[0];
            return new ResidentUser(row.id, row.residentId, row.username, row.email, row.password);
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    },

    // Eliminar un usuario por su ID
    async deleteResidentUser(id) {
        try {
            const query = `
                DELETE FROM UsuarioResidente WHERE id = $1 RETURNING *
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
