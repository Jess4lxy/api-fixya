export default class RequestPayment {
    constructor(id, requestId, amount, method, payDate, status) {
        this.id = id;
        this.requestId = requestId;
        this.amount = amount;
        this.method = method;
        this.payDate = payDate;
        this.status = status;
    }
}