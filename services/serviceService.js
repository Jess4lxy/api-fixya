import serviceRepository from '../repository/serviceRepository.js';

// Obtener todos los servicios
async function getAllServices() {
    return await serviceRepository.getServices();
}

// Agregar un nuevo servicio
async function addService(service) {
    await serviceRepository.validateService(service);
    const services = await getAllServices();
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    const newService = { ...service, id: newId };

    // Guardar todos los servicios actualizados
    services.push(newService);
    await serviceRepository.saveServices(services);

    return newService;
}

// Otras funciones para actualizar y eliminar servicios
async function updateService(id, updatedData) {
    const services = await getAllServices();
    const serviceIndex = services.findIndex(service => service.id == id);

    if (serviceIndex === -1) {
        throw new Error('Servicio no encontrado');
    }

    const updatedService = { ...services[serviceIndex], ...updatedData };
    services[serviceIndex] = updatedService;
    await serviceRepository.saveServices(services);
    return updatedService;
}

async function deleteService(id) {
    const services = await getAllServices();
    const serviceIndex = services.findIndex(service => service.id == id);

    if (serviceIndex === -1) {
        throw new Error('Servicio no encontrado');
    }

    services.splice(serviceIndex, 1);
    await serviceRepository.saveServices(services);
    return { message: 'Servicio eliminado' };
}

export default {
    getAllServices,
    addService,
    updateService,
    deleteService,
};
