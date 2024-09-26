import fs from 'fs-extra'
import Resident from '../models/resident.js'

const filePath = './data/fixya.json'
async function residentsData() {
    try {
        const data = await fs.readJson(filePath);
        return data.residentes;
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

async function getResidents() {
    try {
        const residents = await residentsData();

        if (Array.isArray(residents)) {
            return residents.map(resident => new Resident(
                resident.id,
                resident.nombre,
                resident.email,
                resident.numeroContacto,
                resident.numeroDepartamento,
                resident.historialSolicitudes
            ));
        } else {
            throw new Error('Datos de residentes no encontrados o no es un array.');
        }
    } catch (error) {
        console.error('Error al obtener los residentes:', error);
        throw error;
    }
}

async function newResident(residents) {
    try {
        await fs.writeJson(filePath, residents)
    } catch (error) {
        console.error(error)
    }
}

export default {
    getResidents,
    newResident
}