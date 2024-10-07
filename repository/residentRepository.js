import fs from 'fs-extra';
import Resident from '../models/resident.js';

const filePath = './data/fixya.json';

// Leer datos de residentes del archivo
async function residentsData() {
    try {
        const data = await fs.readJson(filePath);
        return data.residentes || [];
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

// Obtener todos los residentes
async function getResidents() {
    try {
        const residents = await residentsData();
        return residents.map(resident => new Resident(
            resident.id,
            resident.nombre,
            resident.email,
            resident.numeroContacto,
            resident.numeroDepartamento,
            resident.historialSolicitudes
        ));
    } catch (error) {
        console.error('Error al obtener los residentes:', error);
        throw error;
    }
}

// Guardar residentes en el archivo
async function saveResident(newResidents) {
    try {
        // Lee el contenido actual del archivo
        const currentData = await fs.readJson(filePath);

        // Asegúrate de que currentData tenga la propiedad residentes
        currentData.residentes = newResidents;

        // Guarda el archivo completo
        await fs.writeJson(filePath, currentData, { spaces: 4 });
    } catch (error) {
        console.error('Error al guardar los residentes:', error);
        throw error;
    }
}

// Validar datos del residente
async function validateResident(resident) {
    const { id, ...otherFields } = resident;
    const hasEmptyFields = Object.values(otherFields).some(value => !value);

    if (hasEmptyFields) {
        throw new Error("Debes llenar todos los datos del residente.");
    }
}

export default {
    getResidents,
    saveResident,
    validateResident,
};
