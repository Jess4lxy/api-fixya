export default class ProviderConfirmation {
    constructor(id, assignmentId, confirmationDate, qrCode, status) {
        this.id = id;
        this.assignmentId = assignmentId;
        this.confirmationDate = confirmationDate;
        this.qrCode = qrCode;
        this.status = status;
    }
}