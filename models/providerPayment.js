export default class providerPayment {
    constructor(id, administrativeId, providerId, amount, paymentDate, requestId, method, status) {
        this.id = id;
        this.administrativeId = administrativeId;
        this.providerId = providerId;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.requestId = requestId;
        this.method = method;
        this.status = status;
    }
}