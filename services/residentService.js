import residentRepository from '../repository/residentRepository.js';

// Obtener todos los residentes
async function getAllResidents() {
    return await residentRepository.getResidents();
}

// Agregar un nuevo residente
async function addResident(resident) {
    residentRepository.validateResident(resident);
    const residents = await getAllResidents();
    const newId = residents.length > 0 ? Math.max(...residents.map(r => r.id)) + 1 : 1;
    const newResident = { ...resident, id: newId };

    // Guardar todos los residentes actualizados
    residents.push(newResident);
    await residentRepository.saveResident(residents);

    return newResident;
}

// Actualizar un residente
const updateResident = async (id, updatedData) => {
    const residents = await getAllResidents();
    const index = residents.findIndex(resident => resident.id === parseInt(id));

    if (index === -1) {
        throw new Error("Residente no encontrado");
    }

    residents[index] = { ...residents[index], ...updatedData };
    await residentRepository.saveResident(residents); // Guarda todos los residentes actualizados

    return residents[index];
};

// Eliminar un residente
const deleteResident = async (id) => {
    const residents = await getAllResidents();
    const updatedResidents = residents.filter(resident => resident.id !== parseInt(id));

    if (updatedResidents.length === residents.length) {
        throw new Error("Residente no encontrado");
    }

    await residentRepository.saveResident(updatedResidents); // Guarda todos los residentes actualizados
    return { message: "Residente eliminado" };
};

// Buscar residentes por número de departamento
const findResidentsByDepartment = async (numeroDepartamento) => {
    const residents = await getAllResidents();
    console.log("Todos los residentes:", residents);
    console.log("Buscando residentes en el departamento:", numeroDepartamento);
    
    const filteredResidents = residents.filter(resident => resident.numeroDepartamento.toString() === numeroDepartamento.toString());
    console.log("Residentes filtrados:", filteredResidents);
    
    return filteredResidents;
};


export default {
    getAllResidents,
    addResident,
    updateResident,
    deleteResident,
    findResidentsByDepartment
};
