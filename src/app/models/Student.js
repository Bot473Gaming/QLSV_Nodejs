const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Student = new Schema({
    // author: ObjectId,
    studentCode: { type: String, required: true, },
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    birthday: { type: String, required: true, },
    gender: { type: String, required: true, },
    courseCode: { type: String, required: true, },
});

module.exports = mongoose.model('Student', Student);