import historyServiceRepository from '../repository/historyserviceRepository.js';

// Obtener todos los servicios
async function getAllServices() {
    return await historyServiceRepository.getServices();
}

// Agregar un nuevo servicio
async function addService(service) {
    await historyServiceRepository.validateService(service);
    const services = await getAllServices();
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    const newService = { ...service, id: newId };

    services.push(newService);
    await historyServiceRepository.saveServices(services);

    return newService;
}

// Actualizar un servicio
const updateService = async (id, updatedData) => {
    const services = await getAllServices();
    const index = services.findIndex(service => service.id === parseInt(id));

    if (index === -1) {
        throw new Error("Servicio no encontrado");
    }

    services[index] = { ...services[index], ...updatedData };
    await historyServiceRepository.saveServices(services);

    return services[index];
};

// Eliminar un servicio
const deleteService = async (id) => {
    const services = await getAllServices();
    const updatedServices = services.filter(service => service.id !== parseInt(id));

    if (updatedServices.length === services.length) {
        throw new Error("Servicio no encontrado");
    }

    await historyServiceRepository.saveServices(updatedServices);
    return { message: "Servicio eliminado" };
};

export default {
    getAllServices,
    addService,
    updateService,
    deleteService,
};
