// services/residentService.js
import ResidentRepository from '../repository/residentRepository.js';

const ResidentService = {
    // Obtener todos los residentes
    async getAllResidents() {
        return await ResidentRepository.getAllResidents();
    },

    // Obtener un residente por su ID
    async getResidentById(id) {
        const resident = await ResidentRepository.getResidentById(id);
        if (!resident) {
        throw new Error(`Residente con ID ${id} no encontrado`);
        }
        return resident;
    },

    // Crear un nuevo residente
    async createResident(residentData) {
        // Aquí puedes agregar validaciones si es necesario
        return await ResidentRepository.createResident(residentData);
    },

    // Actualizar un residente existente
    async updateResident(id, residentData) {
        const existingResident = await ResidentRepository.getResidentById(id);
        if (!existingResident) {
        throw new Error(`Residente con ID ${id} no encontrado`);
        }
        return await ResidentRepository.updateResident(id, residentData);
    },

    // Eliminar un residente
    async deleteResident(id) {
        const resident = await ResidentRepository.getResidentById(id);
        if (!resident) {
        throw new Error(`Residente con ID ${id} no encontrado`);
        }
        return await ResidentRepository.deleteResident(id);
    },
};

export default ResidentService;
