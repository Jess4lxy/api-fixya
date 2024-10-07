import fs from 'fs-extra';
import Service from '../models/service.js';

const filePath = './data/fixya.json';

// Leer datos de servicios del archivo
async function servicesData() {
    try {
        const data = await fs.readJson(filePath);
        return data.servicios || [];
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

// Obtener todos los servicios
async function getServices() {
    try {
        const services = await servicesData();
        return services.map(service => new Service(
            service.id,
            service.nombre,
            service.descripcion,
            service.costoBase
        ));
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
        throw error;
    }
}

// Guardar servicios en el archivo
async function saveServices(newServices) {
    try {
        const currentData = await fs.readJson(filePath);
        currentData.servicios = newServices;
        await fs.writeJson(filePath, currentData, { spaces: 4 });
    } catch (error) {
        console.error('Error al guardar los servicios:', error);
        throw error;
    }
}

// Validar datos del servicio
async function validateService(service) {
    const { id, ...otherFields } = service;
    const hasEmptyFields = Object.values(otherFields).some(value => !value);

    if (hasEmptyFields) {
        throw new Error("Debes llenar todos los datos del servicio.");
    }
}

export default {
    getServices,
    saveServices,
    validateService,
};
