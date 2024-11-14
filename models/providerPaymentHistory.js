export default class ProviderPaymentHistory {
    constructor(id, providerPaymentId, amountPaid, paymentDate, status) {
        this.id = id;
        this.providerPaymentId = providerPaymentId;
        this.amountPaid = amountPaid;
        this.paymentDate = paymentDate;
        this.status = status;
    }
}