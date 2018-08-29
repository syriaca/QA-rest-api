'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.schema;

let sortAnswers = function(a, b) {
    // negative a before b
    // O no change
    // 
}

let AnswerSchema = new Schema({
    text: String,
    createAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    votes: {type: Number, default: 0}
});

let QuestionSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    answers: [AnswerSchema]
});

QuestionSchema.pre('save', function(next) {
    this.answers.sort();
    next();
});

let Question = mongoose.model('Question', QuestionSchema);

module.exports.Question = Question;