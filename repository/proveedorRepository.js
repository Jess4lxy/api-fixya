import fs from 'fs-extra';
import Proveedor from '../models/proveedor.js';

const filePath = './data/fixya.json';

// Leer datos de proveedores del archivo
async function proveedoresData() {
    try {
        const data = await fs.readJson(filePath);
        return data.proveedores || [];
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

// Obtener todos los proveedores
async function getProveedores() {
    try {
        const proveedores = await proveedoresData();
        return proveedores.map(proveedor => new Proveedor(
            proveedor.id,
            proveedor.nombre,
            proveedor.servicioOfrecido,
            proveedor.certificaciones,
            proveedor.calificacion,
            proveedor.informacionContacto
        ));
    } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        throw error;
    }
}

// Guardar proveedores en el archivo
async function saveProveedor(newProveedores) {
    try {
        const currentData = await fs.readJson(filePath);
        currentData.proveedores = newProveedores;
        await fs.writeJson(filePath, currentData, { spaces: 4 });
    } catch (error) {
        console.error('Error al guardar los proveedores:', error);
        throw error;
    }
}

// Validar datos del proveedor
async function validateProveedor(proveedor) {
    const { id, ...otherFields } = proveedor;
    const hasEmptyFields = Object.values(otherFields).some(value => !value);

    if (hasEmptyFields) {
        throw new Error("Debes llenar todos los datos del proveedor.");
    }
}

export default {
    getProveedores,
    saveProveedor,
    validateProveedor,
};
