import paymentRepository from '../repository/paymentRepository.js';

const getAllPayments = async () => {
    return await paymentRepository.getPayments();
};

const addPayment = async (newPayment) => {
    const payments = await getAllPayments();
    const newId = payments.length > 0 ? Math.max(...payments.map(p => p.id)) + 1 : 1;
    const payment = { id: newId, ...newPayment };
    payments.push(payment);
    await paymentRepository.savePayments(payments);
    return payment;
};

const updatePayment = async (id, updatedData) => {
    const payments = await getAllPayments();
    const paymentIndex = payments.findIndex(payment => payment.id == id);

    if (paymentIndex === -1) {
        throw new Error('Pago no encontrado');
    }

    payments[paymentIndex] = { ...payments[paymentIndex], ...updatedData };
    await paymentRepository.savePayments(payments);
    return payments[paymentIndex];
};

const deletePayment = async (id) => {
    const payments = await getAllPayments();
    const newPayments = payments.filter(payment => payment.id != id);

    if (newPayments.length === payments.length) {
        throw new Error('Pago no encontrado');
    }

    await paymentRepository.savePayments(newPayments);
    return { message: 'Pago eliminado' };
};

export default {
    getAllPayments,
    addPayment,
    updatePayment,
    deletePayment
};
