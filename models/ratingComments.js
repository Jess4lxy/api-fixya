export default class RatingComments {
    constructor(id, assignmentId, residentUserId, rating, comments, date) {
        this.id = id;
        this.assignmentId = assignmentId;
        this.residentUserId = residentUserId;
        this.rating = rating;
        this.comments = comments;
        this.date = date;
    }
}