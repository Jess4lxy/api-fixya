export default class RequestPaymentHistory {
    constructor(id, paymentId, amountPaid, paymentDate, method, status) {
        this.id = id;
        this.paymentId = paymentId;
        this.amountPaid = amountPaid;
        this.paymentDate = paymentDate;
        this.method = method;
        this.status = status;
    }
}