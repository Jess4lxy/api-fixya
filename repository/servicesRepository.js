import Service from "../models/service.js";
import db from '../data/database.js';

const ServiceRepository = {
    // Obtener el total de servicios
    async getTotalServices() {
        try {
            const query = 'SELECT COUNT(*) FROM Service';
            const { rows } = await db.query(query);
            return parseInt(rows[0].count, 10); // Convertir el conteo a un número entero
        } catch (error) {
            throw new Error(`Error al obtener el total de servicios: ${error.message}`);
        }
    },

    // Obtener todos los servicios
    async getAllServices({ limit = 50, offset = 0 }) {
        try {
            const query = `
                SELECT *
                FROM Service
                LIMIT $1 OFFSET $2
            `;
            const { rows } = await db.query(query, [limit, offset]);
            return rows.map(row => new Service(row.id, row.category, row.servicetype, row.description, row.basePrice, row.quantityadjustment));
        } catch (error) {
            throw new Error(`Error al obtener todos los servicios: ${error.message}`);
        }
    },

    // Obtener un servicio por su ID
    async getServiceById(id) {
        try {
            const query = 'SELECT * FROM Service WHERE id = $1';
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                throw new Error('No se encontró el servicio con el ID especificado');
            }
            const row = rows[0];
            return new Service(row.id, row.category, row.servicetype, row.description, row.basePrice, row.quantityadjustment);
        } catch (error) {
            throw new Error(`Error al obtener el servicio con ID ${id}: ${error.message}`);
        }
    },

    // Crear un nuevo servicio
    async createService(data) {
        const { category, serviceType, description, basePrice, quantityAdjustment } = data;
        try {
            const query = 'INSERT INTO Service (category, serviceType, description, basePrice, quantityAdjustment) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const values = [category, serviceType, description, basePrice, quantityAdjustment];
            const { rows } = await db.query(query, values);
            const row = rows[0];
            return new Service(row.id, row.category, row.servicetype, row.description, row.basePrice, row.quantityadjustment);
        } catch (error) {
            throw new Error(`Error al crear el nuevo servicio: ${error.message}`);
        }
    },

    // Actualizar un servicio
    async updateService(id, data) {
        const { category, serviceType, description, basePrice, quantityAdjustment } = data;
        try {
            const query = 'UPDATE Service SET category = $1, serviceType = $2, description = $3, basePrice = $4, quantityAdjustment = $5 WHERE id = $6 RETURNING *';
            const { rows } = await db.query(query, [category, serviceType, description, basePrice, quantityAdjustment, id]);
            if (rows.length === 0) {
                throw new Error('No se encontró el servicio con el ID especificado');
            }
            const row = rows[0];
            return new Service(row.id, row.category, row.servicetype, row.description, row.basePrice, row.quantityadjustment);
        } catch (error) {
            throw new Error(`Error al actualizar el servicio con ID ${id}: ${error.message}`);
        }
    },

    // Eliminar un servicio
    async deleteService(id) {
        try {
            const query = 'DELETE FROM Service WHERE id = $1 RETURNING *';
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                throw new Error('No se encontró el servicio con el ID especificado');
            }
            const row = rows[0];
            return new Service(row.id, row.category, row.servicetype, row.description, row.basePrice, row.quantityadjustment);
        } catch (error) {
            throw new Error(`Error al eliminar el servicio con ID ${id}: ${error.message}`);
        }
    },
}

export default ServiceRepository;