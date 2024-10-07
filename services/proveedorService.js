import proveedorRepository from '../repository/proveedorRepository.js';

// Obtener todos los proveedores
async function getAllProveedores() {
    return await proveedorRepository.getProveedores();
}

// Agregar un nuevo proveedor
async function addProveedor(proveedor) {
    proveedorRepository.validateProveedor(proveedor);
    const proveedores = await getAllProveedores();
    const newId = proveedores.length > 0 ? Math.max(...proveedores.map(p => p.id)) + 1 : 1;
    const newProveedor = { ...proveedor, id: newId };

    // Guardar todos los proveedores actualizados
    proveedores.push(newProveedor);
    await proveedorRepository.saveProveedor(proveedores);

    return newProveedor;
}

// Actualizar un proveedor
const updateProveedor = async (id, updatedData) => {
    const proveedores = await getAllProveedores();
    const index = proveedores.findIndex(proveedor => proveedor.id === parseInt(id));

    if (index === -1) {
        throw new Error("Proveedor no encontrado");
    }

    proveedores[index] = { ...proveedores[index], ...updatedData };
    await proveedorRepository.saveProveedor(proveedores);

    return proveedores[index];
};

// Eliminar un proveedor
const deleteProveedor = async (id) => {
    const proveedores = await getAllProveedores();
    const updatedProveedores = proveedores.filter(proveedor => proveedor.id !== parseInt(id));

    if (updatedProveedores.length === proveedores.length) {
        throw new Error("Proveedor no encontrado");
    }

    await proveedorRepository.saveProveedor(updatedProveedores);
    return { message: "Proveedor eliminado" };
};

export default {
    getAllProveedores,
    addProveedor,
    updateProveedor,
    deleteProveedor,
};
