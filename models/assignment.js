export default class Assignment {
    constructor(id, requestId, administrativeId, providerId, assignmentId, status, comments) {
        this.id = id;
        this.requestId = requestId;
        this.creatorId = creatorId;
        this.administrativeId = administrativeId
        this.providerId = providerId;
        this.assignmentId = assignmentId;
        this.status = status;
        this.comments = comments;
    }
}