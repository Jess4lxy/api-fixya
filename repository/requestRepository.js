import Request from "../models/request.js";
import db from "../data/database.js"

const requestRepository = {
    // Obtener el total de solicitudes
    async getTotalRequests() {
        try {
            const query = 'SELECT COUNT(*) FROM Request';
            const { rows } = await db.query(query);
            return parseInt(rows[0].count, 10); // Convertir el conteo a un número entero
        } catch (error) {
            throw new Error(`Error al obtener el total de solicitudes: ${error.message}`);
        }
    },

    // Obtener todas las solicitudes
    async getAllRequests({ limit = 50, offset = 0 }) {
        try {
            const query = 'SELECT * FROM Request LIMIT $1 OFFSET $2';
            const { rows } = await db.query(query, [limit, offset]);
            return rows.map(row => new Request(row.id, row.residentuserid, row.serviceid, row.quantity, row.totalprice, row.requestdate, row.scheduleddate, row.status));
        } catch (error) {
            throw new Error(`Error al obtener todas las solicitudes: ${error.message}`);
        }
    },

    // Obtener una sola solicitud por ID
    async getRequestById(id) {
        try {
            const query = 'SELECT * FROM Request WHERE id = $1';
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Request(row.id, row.residentuserid, row.serviceid, row.quantity, row.totalprice, row.requestdate, row.scheduleddate, row.status);
        } catch (error) {
            throw new Error(`Error al obtener la solicitud: ${error.message}`);
        }
    },

    // Crear una nueva solicitud
    async createRequest({ data }) {
        const { residentUserId, serviceId, quantity, totalPrice, requestDate, scheduledDate, status } = data;
        try {
            const query = 'INSERT INTO Request (residentUserId, serviceId, quantity, totalPrice, requestDate, scheduledDate, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
            const { rows } = await db.query(query, [residentUserId, serviceId, quantity, totalPrice, requestDate, scheduledDate, status]);
            const row = rows[0];
            return new Request(row.id, row.residentuserid, row.serviceid, row.quantity, row.totalprice, row.requestdate, row.scheduleddate, row.status);
        } catch (error) {
            throw new Error(`Error al crear la solicitud: ${error.message}`);
        }
    },

    // Actualizar una solicitud
    async updateRequest(id, data) {
        const { residentUserId, serviceId, quantity, totalPrice, requestDate, scheduledDate, status } = data;
        try {
            const query = 'UPDATE Request SET residentUserId = $1, serviceId = $2, quantity = $3, totalPrice = $4, requestDate = $5, scheduledDate = $6, status = $7 WHERE id = $8 RETURNING *';
            const { rows } = await db.query(query, [residentUserId, serviceId, quantity, totalPrice, requestDate, scheduledDate, status, id]);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Request(row.id, row.residentuserid, row.serviceid, row.quantity, row.totalprice, row.requestdate, row.scheduleddate, row.status);
        }catch (error) {
            throw new Error(`Error al actualizar la solicitud con ID ${id}: ${error.message}`);
        }
    },

    // Eliminar una solicitud
    async deleteRequest(id) {
        try {
            const query = 'DELETE FROM Request WHERE id = $1 RETURNING *';
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Request(row.id, row.residentuserid, row.serviceid, row.quantity, row.totalprice, row.requestdate, row.scheduleddate, row.status);
        } catch (error) {
            throw new Error(`Error al eliminar la solicitud con ID ${id}: ${error.message}`);
        }
    },
}

export default requestRepository;