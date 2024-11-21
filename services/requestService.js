import requestRepository from "../repository/requestRepository.js";
import Request from "../models/request.js";

const requestService = {
    // Obtener el total de solicitudes
    async getTotalRequests() {
        try {
            const totalRequests = await requestRepository.getTotalRequests();
            return totalRequests;
        } catch (error) {
            throw new Error(`Error al obtener el total de solicitudes: ${error.message}`);
        }
    },

    // Obtener todas las solicitudes
    async getAllRequests(page = 1, pageSize = 50) {
        try {
            const offset = (page - 1) * pageSize;
            const requests = await requestRepository.getAllRequests({ limit: pageSize, offset });
            return requests
        } catch (error) {
            throw new Error(`Error al obtener todas las solicitudes: ${error.message}`);
        }
    },

    // Obtener una solicitud por su ID
    async getRequestById(id) {
        try{
            const request = await requestRepository.getRequestById(id);
            return new Request(request);
        } catch (error) {
            throw new Error(`Error al obtener la solicitud con ID ${id}: ${error.message}`);
        }
    },

    // Crear una nueva solicitud
    async createRequest(data) {
        const { residentUserId, serviceId, quantity, totalPrice, requestDate, scheduledDate, status } = data;
        try {
            const newRequestData = await requestRepository.createRequest({ residentUserId, serviceId, quantity, totalPrice, requestDate, scheduledDate, status });
            return new Request(newRequestData);
        } catch (error) {
            throw new Error(`Error al crear la solicitud: ${error.message}`);
        }
    },

    // Actualizar una solicitud existente
    async updateRequest(id, data) {
        try {
            const { residentUserId, serviceId, quantity, totalPrice, requestDate, scheduledDate, status } = data;
            const updatedRequestData = await requestRepository.updateRequest(id, { residentUserId, serviceId, quantity, totalPrice, requestDate, scheduledDate, status });
            if (!updatedRequestData) {
                throw new Error(`No se encontró la solicitud con ID ${id}`);
            }
            return new Request(updatedRequestData);
        } catch (error) {
            throw new Error(`Error al actualizar la solicitud con ID ${id}: ${error.message}`);
        }
    },

    // Eliminar una solicitud existente
    async deleteRequest(id) {
        try {
            const deletedRequestData = await requestRepository.deleteRequest(id);
            if (!deletedRequestData) throw new Error(`No se encontró la solicitud con ID ${id}`);
            return new Request(deletedRequestData);
        } catch (error) {
            throw new Error(`Error al eliminar la solicitud con ID ${id}: ${error.message}`);
        }
    }
}

export default requestService;