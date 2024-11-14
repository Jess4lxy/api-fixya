export default class Request {
    constructor(id, residentUserId, serviceId, quantity, totalPrice, requestDate, scheduledDate, status) {
        this.id = id;
        this.residentUserId = residentUserId;
        this.serviceId = serviceId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.requestDate = requestDate;
        this.scheduledDate = scheduledDate;
        this.status = status;
    }
}