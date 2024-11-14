export default class Notification {
    constructor(id, userResidentId, message, date, status) {
        this.id = id;
        this.userId = userResidentId;
        this.message = message;
        this.date = date;
        this.status = status;
    }
}