import fs from 'fs-extra';
import Invoice from '../models/invoice.js';

const filePath = './data/fixya.json';

// Leer los datos de facturas
async function invoiceData() {
    try {
        const data = await fs.readJson(filePath);
        return data.facturas || [];
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

// Guardar las facturas en el archivo JSON
async function saveInvoices(newInvoices) {
    try {
        const currentData = await fs.readJson(filePath);
        currentData.facturas = newInvoices;
        await fs.writeJson(filePath, currentData, { spaces: 4 });
    } catch (error) {
        console.error('Error al guardar las facturas:', error);
        throw error;
    }
}

// Obtener todas las facturas
async function getInvoices() {
    try {
        const invoices = await invoiceData();
        return invoices.map(invoice => new Invoice(
            invoice.id,
            invoice.monto,
            invoice.fechaEmision,
            invoice.proveedorId,
            invoice.solicitudId
        ));
    } catch (error) {
        console.error('Error al obtener las facturas:', error);
        throw error;
    }
}

export default {
    getInvoices,
    saveInvoices
};
