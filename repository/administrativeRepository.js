import fs from 'fs-extra';
import Administrative from '../models/administrative.js';

const filePath = './data/fixya.json'; // Ruta al archivo JSON

// Leer los datos de administradores
async function administrativeData() {
    try {
        const data = await fs.readJson(filePath);
        return data.administrativos || [];
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

// Guardar los administradores en el archivo JSON
async function saveAdministratives(newAdministratives) {
    try {
        const currentData = await fs.readJson(filePath);
        currentData.administrativos = newAdministratives;
        await fs.writeJson(filePath, currentData, { spaces: 4 });
    } catch (error) {
        console.error('Error al guardar los administradores:', error);
        throw error;
    }
}

// Obtener todos los administradores
async function getAdministratives() {
    try {
        const administratives = await administrativeData();
        return administratives.map(administrative => new Administrative(
            administrative.id,
            administrative.nombre,
            administrative.email,
            administrative.rol,
            administrative.fechaIngreso
        ));
    } catch (error) {
        console.error('Error al obtener los administradores:', error);
        throw error;
    }
}

export default {
    getAdministratives,
    saveAdministratives
};
