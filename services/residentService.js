import residentRepository from '../repository/residentRepository.js';

// Obtener todos los residentes
async function getAllResidents(){
    return await residentRepository.getResidents();
}

// Agregar un nuevo residente
const addResident = async (newResident) => {
    const residents = await getAllResidents();
    residents.push(newResident);
    await fs.writeFile(filePath, JSON.stringify(residents, null, 2));
    return newResident;
};

// Actualizar un residente
const updateResident = async (id, updatedData) => {
    const residents = await getAllResidents();
    const index = residents.findIndex(resident => resident.id === parseInt(id));

    if (index === -1) {
        throw new Error("Residente no encontrado");
    }

    residents[index] = { ...residents[index], ...updatedData };
    await fs.writeFile(filePath, JSON.stringify(residents, null, 2));
    return residents[index];
};

// Eliminar un residente
const deleteResident = async (id) => {
    const residents = await getAllResidents();
    const updatedResidents = residents.filter(resident => resident.id !== parseInt(id));

    if (updatedResidents.length === residents.length) {
        throw new Error("Residente no encontrado");
    }

    await fs.writeFile(filePath, JSON.stringify(updatedResidents, null, 2));
    return { message: "Residente eliminado" };
};

// Buscar residentes por número de departamento
const findResidentsByDepartment = async (numeroDepartamento) => {
    const residents = await getAllResidents();
    return residents.filter(resident => resident.numeroDepartamento === numeroDepartamento);
};

export default {
    getAllResidents,
    addResident,
    updateResident,
    deleteResident,
    findResidentsByDepartment
};
