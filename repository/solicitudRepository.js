import fs from 'fs-extra';
import Solicitud from '../models/solicitud.js';

const filePath = './data/fixya.json';

// Leer datos de solicitudes del archivo
async function solicitudesData() {
    try {
        const data = await fs.readJson(filePath);
        return data.solicitudes || [];
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

// Obtener todas las solicitudes
async function getSolicitudes() {
    try {
        const solicitudes = await solicitudesData();
        return solicitudes.map(solicitud => new Solicitud(
            solicitud.id,
            solicitud.descripcion,
            solicitud.tipoServicio,
            solicitud.estado,
            solicitud.fechaCreacion,
            solicitud.fechaFinalizacion,
            solicitud.prioridad,
            solicitud.residenteId,
            solicitud.proveedorId
        ));
    } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
        throw error;
    }
}

// Guardar solicitudes en el archivo
async function saveSolicitudes(newSolicitudes) {
    try {
        const currentData = await fs.readJson(filePath);
        currentData.solicitudes = newSolicitudes;
        await fs.writeJson(filePath, currentData, { spaces: 4 });
    } catch (error) {
        console.error('Error al guardar las solicitudes:', error);
        throw error;
    }
}

// Validar datos de la solicitud
async function validateSolicitud(solicitud) {
    const { id, ...otherFields } = solicitud;
    const hasEmptyFields = Object.values(otherFields).some(value => !value);
    
    if (hasEmptyFields) {
        throw new Error("Debes llenar todos los datos de la solicitud.");
    }
}

export default {
    getSolicitudes,
    saveSolicitudes,
    validateSolicitud,
};
