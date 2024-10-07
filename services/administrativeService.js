import administrativeRepository from '../repository/administrativeRepository.js';

// Obtener todos los administradores
async function getAllAdministratives() {
    return await administrativeRepository.getAdministratives();
}

// Obtener un administrador por ID
async function getAdministrativeById(id) {
    const administratives = await getAllAdministratives();
    return administratives.find(admin => admin.id == id);
}

// Agregar un nuevo administrador
async function addAdministrative(administrative) {
    const administratives = await getAllAdministratives();
    const newId = administratives.length > 0 ? Math.max(...administratives.map(a => a.id)) + 1 : 1;
    const newAdministrative = { ...administrative, id: newId };  // Aquí se genera la ID automáticamente

    // Guardar todos los administradores actualizados
    administratives.push(newAdministrative);
    await administrativeRepository.saveAdministratives(administratives);

    return newAdministrative;
}

// Actualizar un administrador
async function updateAdministrative(id, updatedData) {
    const administratives = await getAllAdministratives();
    const adminIndex = administratives.findIndex(admin => admin.id == id);

    if (adminIndex === -1) {
        throw new Error('Administrador no encontrado');
    }

    const updatedAdministrative = { ...administratives[adminIndex], ...updatedData };
    administratives[adminIndex] = updatedAdministrative;
    await administrativeRepository.saveAdministratives(administratives);
    return updatedAdministrative;
}

// Eliminar un administrador
async function deleteAdministrative(id) {
    const administratives = await getAllAdministratives();
    const updatedAdministratives = administratives.filter(admin => admin.id != id);

    if (updatedAdministratives.length === administratives.length) {
        throw new Error('Administrador no encontrado');
    }

    await administrativeRepository.saveAdministratives(updatedAdministratives);
    return { message: 'Administrador eliminado' };
}

// Buscar administrador por email
async function findByEmail(email) {
    const administratives = await getAllAdministratives();
    return administratives.find(admin => admin.email === email);
}

export default {
    getAllAdministratives,
    getAdministrativeById,
    addAdministrative,
    updateAdministrative,
    deleteAdministrative,
    findByEmail
};
