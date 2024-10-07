import invoiceRepository from '../repository/invoiceRepository.js';

// Obtener todas las facturas
async function getAllInvoices() {
    return await invoiceRepository.getInvoices();
}

// Agregar una nueva factura
async function addInvoice(invoice) {
    const invoices = await getAllInvoices();
    const newId = invoices.length > 0 ? Math.max(...invoices.map(i => i.id)) + 1 : 1;
    const newInvoice = { ...invoice, id: newId };

    // Guardar todas las facturas actualizadas
    invoices.push(newInvoice);
    await invoiceRepository.saveInvoices(invoices);

    return newInvoice;
}

// Eliminar una factura
async function deleteInvoice(id) {
    const invoices = await getAllInvoices();
    const updatedInvoices = invoices.filter(invoice => invoice.id != id);

    if (updatedInvoices.length === invoices.length) {
        throw new Error('Factura no encontrada');
    }

    await invoiceRepository.saveInvoices(updatedInvoices);
    return { message: 'Factura eliminada' };
}

export default {
    getAllInvoices,
    addInvoice,
    deleteInvoice
};
