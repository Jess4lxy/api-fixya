import solicitudRepository from '../repository/solicitudRepository.js';

// Obtener todas las solicitudes
async function getAllSolicitudes() {
    return await solicitudRepository.getSolicitudes();
}

// Agregar una nueva solicitud
async function addSolicitud(solicitud) {
    solicitudRepository.validateSolicitud(solicitud);
    const solicitudes = await getAllSolicitudes();
    const newId = solicitudes.length > 0 ? Math.max(...solicitudes.map(s => s.id)) + 1 : 1;
    const newSolicitud = { ...solicitud, id: newId };

    // Guardar todas las solicitudes actualizadas
    solicitudes.push(newSolicitud);
    await solicitudRepository.saveSolicitudes(solicitudes);

    return newSolicitud;
}

// Actualizar una solicitud
const updateSolicitud = async (id, updatedData) => {
    const solicitudes = await getAllSolicitudes();
    const index = solicitudes.findIndex(solicitud => solicitud.id === parseInt(id));

    if (index === -1) {
        throw new Error("Solicitud no encontrada");
    }

    solicitudes[index] = { ...solicitudes[index], ...updatedData };
    await solicitudRepository.saveSolicitudes(solicitudes);

    return solicitudes[index];
};

// Eliminar una solicitud
const deleteSolicitud = async (id) => {
    const solicitudes = await getAllSolicitudes();
    const updatedSolicitudes = solicitudes.filter(solicitud => solicitud.id !== parseInt(id));

    if (updatedSolicitudes.length === solicitudes.length) {
        throw new Error("Solicitud no encontrada");
    }

    await solicitudRepository.saveSolicitudes(updatedSolicitudes);
    return { message: "Solicitud eliminada" };
};

export default {
    getAllSolicitudes,
    addSolicitud,
    updateSolicitud,
    deleteSolicitud,
};
