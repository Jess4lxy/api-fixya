import Apartment from "../models/apartment.js";
import db from "../data/database.js";

const ApartmentRepository = {
    // Obtener el total de de departamentos
    async getTotalApartments() {
        try {
            const query = 'SELECT COUNT(*) FROM Apartment';
            const { rows } = await db.query(query);
            return parseInt(rows[0].count, 10); // Convertir el conteo a un número entero
        } catch (error) {
            throw new Error(`Error al obtener el total de departamentos: ${error.message}`);
        }
    },
    // Obtener todos los departamentos
    async getAllApartments({ limit = 50, offset = 0 }) {
        try {
            const query = 'SELECT * FROM Apartment LIMIT $1 OFFSET $2';
            const { rows } = await db.query(query, [limit, offset]);
            return rows.map(row => new Apartment(row.id, row.apartmentNumber, row.floor, row.squareMeters, row.bathroomsNumber, row.roomsNumber));
        } catch (error) {
            throw new Error(`Error al obtener todos los departamentos: ${error.message}`);
        }
    },
    // Obtener un departamento por su ID
    async getApartmentById(id) {
        try {
            const query = 'SELECT * FROM Apartment WHERE id = $1';
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Apartment(row.id, row.apartmentNumber, row.floor, row.squareMeters, row.bathroomsNumber, row.roomsNumber);
        } catch (error) {
            throw new Error(`Error al obtener el departamento: ${error.message}`);
        }
    },
    // Crear un nuevo departamento
    async createApartment(data) {
        const { apartmentNumber, floor, squareMeters, bathroomsNumber, roomsNumber } = data;
        try {
            const query = 'INSERT INTO Apartment (apartmentNumber, floor, squareMeters, bathroomsNumber, roomsNumber) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const { rows } = await db.query(query, [apartmentNumber, floor, squareMeters, bathroomsNumber, roomsNumber]);
            const row = rows[0];
            return new Apartment(row.id, row.apartmentNumber, row.floor, row.squareMeters, row.bathroomsNumber, row.roomsNumber);
        } catch (error) {
            throw new Error(`Error al crear el departamento: ${error.message}`);
        }
    },
    // Actualizar un departamento
    async updateApartment(id, data) {
        const { apartmentNumber, floor, squareMeters, bathroomsNumber, roomsNumber } = data;
        try {
            const query = 'UPDATE Apartment SET apartmentNumber = $1, floor = $2, squareMeters = $3, bathroomsNumber = $4, roomsNumber = $5 WHERE id = $6 RETURNING *';
            const { rows } = await db.query(query, [apartmentNumber, floor, squareMeters, bathroomsNumber, roomsNumber, id]);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Apartment(row.id, row.apartmentNumber, row.floor, row.squareMeters, row.bathroomsNumber, row.roomsNumber);
        } catch (error) {
            throw new Error(`Error al actualizar el departamento: ${error.message}`);
        }
    },
    // Eliminar un departamento
    async deleteApartment(id) {
        try {
            const query = 'DELETE FROM Apartment WHERE id = $1 RETURNING *';
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Apartment(row.id, row.apartmentNumber, row.floor, row.squareMeters, row.bathroomsNumber, row.roomsNumber);
        } catch (error) {
            throw new Error(`Error al eliminar el departamento: ${error.message}`);
        }
    },
}

export default ApartmentRepository;