import ServiceRepository from "../repository/servicesRepository.js";
import Service from "../models/service.js";

const servicesService = {
    // Obtener el total de servicios
    async getTotalServices() {
        try {
            return await ServiceRepository.getTotalServices();
        } catch (error) {
            throw new Error(`Error al obtener el total de servicios: ${error.message}`);
        }
    },

    // Obtener todos los servicios
    async getAllServices(page = 1, pageSize = 50) {
        try {
            const offset = (page - 1) * pageSize;
            const services = await ServiceRepository.getAllServices({ limit: pageSize, offset });
            return services
        } catch (error) {
            throw new Error(`Error al obtener todos los servicios: ${error.message}`);
        }
    },

    // Obtener un servicio por su ID
    async getServiceById(id) {
        try {
            const service = await ServiceRepository.getServiceById(id);
            return new Service(service);
        } catch (error) {
            throw new Error(`Error al obtener el servicio con ID ${id}: ${error.message}`);
        }
    },

    // Crear un nuevo servicio
    async createService(data) {
        const {category, serviceType, description, basePrice, quantityAdjustment } = data;

        try {
            const newServiceData = await ServiceRepository.createService({ category, serviceType, description, basePrice, quantityAdjustment });
            return new Service(newServiceData);
        } catch (error) {
            throw new Error(`Error al crear el nuevo servicio: ${error.message}`);
        }
    },

    // Actualizar un servicio existente
    async updateService(id, data) {
        const { category, serviceType, description, basePrice, quantityAdjustment } = data;

        try {
            const newServiceData = await ServiceRepository.updateService(id, {category, serviceType, description, basePrice, quantityAdjustment});
            if (!newServiceData) throw new Error("Servicio no encontrado o no actualizado");
            return new Service(newServiceData);
        } catch(error) {
            throw new Error(`Error al actualizar el servicio con ID ${id}: ${error.message}`);
        }
    },

    // Eliminar un servicio existente
    async deleteService(id) {
        try {
            const deletedServiceData = await ServiceRepository.deleteService(id);
            if (!deletedServiceData) throw new Error("Servicio no encontrado o ya eliminado");
            return new Service(deletedServiceData);
        } catch {
            throw new Error(`Error al eliminar el servicio con ID ${id}: ${error.message}`);
        }
    },
}

export default servicesService;