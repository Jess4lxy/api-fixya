import Resident from '../models/resident.js';
import ResidentRepository from '../repositories/ResidentRepository.js';

const ResidentService = {
    // Obtener todos los residentes
    async getAllResidents() {
        try {
            const residentsData = await ResidentRepository.getAllResidents();
            return residentsData.map(
                (resident) => new Resident(resident.id, resident.idDepartamento, resident.numRegistro, resident.identificacion, resident.nombre)
            );
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
            return new Resident(residentData.id, residentData.idDepartamento, residentData.numRegistro, residentData.identificacion, residentData.nombre);
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
            return rows.map(row => new Resident(row.id, row.iddepartamento, row.numregistro, row.identificacion, row.nombre));
        } catch (error) {
            throw new Error('Error al obtener los residentes: ' + error.message);
        }
    },

    // Crear un nuevo residente
    async createResident(data) {
        const { idDepartamento, numRegistro, identificacion, nombre } = data;

        if (!idDepartamento || !numRegistro || !identificacion || !nombre) {
            throw new Error('Todos los campos son requeridos para crear un residente');
        }

        try {
            const newResidentData = await ResidentRepository.createResident({ idDepartamento, numRegistro, identificacion, nombre });
            return new Resident(newResidentData.id, newResidentData.idDepartamento, newResidentData.numRegistro, newResidentData.identificacion, newResidentData.nombre);
        } catch (error) {
            throw new Error(`Error al crear el residente: ${error.message}`);
        }
    },

    // Actualizar un residente existente
    async updateResident(id, data) {
        const { idDepartamento, numRegistro, identificacion, nombre } = data;

        if (!id) throw new Error('ID de residente es requerido');
        if (!idDepartamento || !numRegistro || !identificacion || !nombre) {
            throw new Error('Todos los campos son requeridos para actualizar un residente');
        }

        try {
            const updatedResidentData = await ResidentRepository.updateResident(id, { idDepartamento, numRegistro, identificacion, nombre });
            if (!updatedResidentData) throw new Error('Residente no encontrado o no actualizado');
            return new Resident(updatedResidentData.id, updatedResidentData.idDepartamento, updatedResidentData.numRegistro, updatedResidentData.identificacion, updatedResidentData.nombre);
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
            return new Resident(deletedResidentData.id, deletedResidentData.idDepartamento, deletedResidentData.numRegistro, deletedResidentData.identificacion, deletedResidentData.nombre);
        } catch (error) {
            throw new Error(`Error al eliminar el residente con ID ${id}: ${error.message}`);
        }
    }
};

export default ResidentService;
