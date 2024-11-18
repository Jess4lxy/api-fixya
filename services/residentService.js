import Resident from '../models/resident.js';
import ResidentRepository from '../repository/residentRepository.js';

const ResidentService = {
    // Obtener el total de residentes
    async getTotalResidents() {
        try {
            return await ResidentRepository.getTotalResidents();
        } catch (error) {
            throw new Error(`Error al obtener el total de residentes: ${error.message}`);
        }
    },

    // Obtener todos los residentes
    async getAllResidents(page = 1, pageSize = 50) {
        try {
            const offset = (page - 1) * pageSize;
            const residentsData = await ResidentRepository.getAllResidents({limit: pageSize, offset});
            return residentsData;
        } catch (error) {
            throw new Error(`Error al obtener todos los residentes: ${error.message}`);
        }
    },

    // Obtener un residente por su ID
    async getResidentById(id) {
        if (!id) throw new Error('ID de residente es requerido');
        try {
            const residentData = await ResidentRepository.getResidentById(id);
            if (!residentData) throw new Error('Residente no encontrado');
            return new Resident(residentData.id, residentData.idApartment, residentData.numRegister, residentData.identification, residentData.name);
        } catch (error) {
            throw new Error(`Error al obtener el residente con ID ${id}: ${error.message}`);
        }
    },

    // Obtener residentes por ID de departamento
    async findResidentsByDepartment(departmentId) {
        try {
            const rows = await ResidentRepository.getResidentsByDepartment(departmentId);
            if (rows.length === 0) {
                throw new Error('No se encontraron residentes para este departamento');
            }
            return rows.map(row => new Resident(row.id, row.idApartment, row.numRegister, row.identification, row.name));
        } catch (error) {
            throw new Error('Error al obtener los residentes: ' + error.message);
        }
    },

    // Crear un nuevo residente
    async createResident(data) {
        const { idApartment, numRegister, identification, name } = data;

        if (!idApartment || !numRegister || !identification || !name) {
            throw new Error('Todos los campos son requeridos para crear un residente');
        }

        try {
            const newResidentData = await ResidentRepository.createResident({ idApartment, numRegister, identification, name });
            return new Resident(newResidentData.id, newResidentData.idApartment, newResidentData.numRegister, newResidentData.identification, newResidentData.name);
        } catch (error) {
            throw new Error(`Error al crear el residente: ${error.message}`);
        }
    },

    // Actualizar un residente existente
    async updateResident(id, data) {
        const { idApartment, numRegister, identification, name } = data;

        if (!id) throw new Error('ID de residente es requerido');
        if (!idApartment || !numRegister || !identification || !name) {
            throw new Error('Todos los campos son requeridos para actualizar un residente');
        }

        try {
            const updatedResidentData = await ResidentRepository.updateResident(id, { idApartment, numRegister, identification, name });
            if (!updatedResidentData) throw new Error('Residente no encontrado o no actualizado');
            return new Resident(updatedResidentData.id, updatedResidentData.idApartment, updatedResidentData.numRegister, updatedResidentData.identification, updatedResidentData.name);
        } catch (error) {
            throw new Error(`Error al actualizar el residente con ID ${id}: ${error.message}`);
        }
    },

    // Eliminar un residente
    async deleteResident(id) {
        if (!id) throw new Error('ID de residente es requerido');

        try {
            const deletedResidentData = await ResidentRepository.deleteResident(id);
            if (!deletedResidentData) throw new Error('Residente no encontrado o ya eliminado');
            return new Resident(deletedResidentData.id, deletedResidentData.idApartment, deletedResidentData.numRegister, deletedResidentData.identification, deletedResidentData.name);
        } catch (error) {
            throw new Error(`Error al eliminar el residente con ID ${id}: ${error.message}`);
        }
    }
};

export default ResidentService;
