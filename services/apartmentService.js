import ApartmentRepository from "../repository/apartmentRepository.js";
import Apartment from "../models/apartment.js";

const ApartmentService = {
    // Obtener el total de departamentos
    async getTotalApartments() {
        try {
            return await ApartmentRepository.getTotalApartments();
        } catch (error) {
            throw new Error(`Error al obtener el total de departamentos: ${error.message}`);
        }
    },

    // Obtener todos los departamentos
    async getAllApartments(page = 1, pageSize = 50) {
        try {
            const offset = (page - 1) * pageSize;
            const apartmentsData = await ApartmentRepository.getAllApartments({limit: pageSize, offset});
            console.log('datos pasando por el service: ', apartmentsData);
            return apartmentsData;
        } catch (error) {
            throw new Error(`Error al obtener todos los departamentos: ${error.message}`);
        }
    },

    // Obtener un departamento por su ID
    async getApartmentById(id) {
        if (!id) throw new Error('ID del departamento es requerido');
        try {
            const apartmentsData = await ApartmentRepository.getApartmentById(id);
            if (!apartmentsData) throw new Error('Departamento no encontrado');
            return new Apartment(apartmentsData);
        } catch (error) {
            throw new Error(`Error al obtener el departamento con ID ${id}: ${error.message}`);
        }
    },

    // Crear un nuevo departamento
    async createApartment(data) {
        const { apartmentNumber, floor, squareMeters, bathroomsNumber, roomsNumber } = data;

        if (!apartmentNumber || !floor || !squareMeters || !bathroomsNumber || !roomsNumber)
            throw new Error('Todos los campos son requeridos para crear un departamento');

        try {
            const newApartmentData = await ApartmentRepository.createApartment({apartmentNumber, floor, squareMeters, bathroomsNumber, roomsNumber});
            return new Apartment(newApartmentData);
        } catch (error) {
            throw new Error(`Error al crear el departamento: ${error.message}`);
        }
    },

    // Actualizar un departamento existente
    async updateApartment(id, data) {
        const { apartmentNumber, floor, squareMeters, bathroomsNumber, roomsNumber } = data;

        if (!id) throw new Error('ID del departamento es requerido');
        if (!apartmentNumber || !floor || !squareMeters || !bathroomsNumber || !roomsNumber) {
            throw new Error('Todos los campos son requeridos para actualizar un departamento');
        }

        try {
            const updatedApartmentData = await ApartmentRepository.updateApartment(id, {apartmentNumber, floor, squareMeters, bathroomsNumber, roomsNumber});
            if (!updatedApartmentData) throw new Error('Departamento no encontrado o no actualizado');
            return new Apartment(updatedApartmentData);
        } catch (error) {
            throw new Error(`Error al actualizar el departamento con ID ${id}: ${error.message}`);
        }
    },

    // Eliminar un departamento
    async deleteApartment(id) {
        if (!id) throw new Error('ID del departamento es requerido');

        try {
            const deletedApartmentData = await ApartmentRepository.deleteApartment(id);
            if (!deletedApartmentData) throw new Error('Departamento no encontrado o ya eliminado');
            return new Apartment(deletedApartmentData);
        } catch (error) {
            throw new Error(`Error al eliminar el departamento con ID ${id}: ${error.message}`);
        }
    }
}

export default ApartmentService;