'use strict';

const express = require('express');
const router = express.Router();
const Question = require('./models').Question;

router.param('qID', function(req, res, next, id){
    Question.findById(req.params.qID, function(err, doc){
        if(err) return next(err);
        if(!doc) {
            err = new Error('Not Found');
            err.status = 404;
            return next(err);
        }
        req.question = doc;
        return next();
    });
});

router.param('aID', function(req, res, next, id){
    req.answer = req.question.answers.id(id);
    if(!req.answer) {
        err = new Error('Not Found');
        err.status = 404;
        return next(err);
    }
    next();
});

// GET /questions
// Route for questions collection
router.get('/', (req, res) => {
    Question
        .find({})
        .sort({createdAt: -1})
        .exec(function(err, questions){
            if(err) return next(err);
            res.json(questions);
        });
});

// POST /questions
// Route for creating questions
router.post('/', (req, res, next) => {
    let question = new Question(req.body);
    question.save(function(err, question){
        if(err) return next(err);
        res.status(201);
        res.json(question);
    });
});

// GET /questions/:id
// Route for specific questions
router.get('/:qID', (req, res) => {
    res.json(req.question);
});

// POST /questions/:qID/answers
// Route for creating an answer
router.post('/:qID/answers', (req, res, next) => {
    req.question.answers.push(req.body);
    req.question.save(function(err, question) {
        if(err) return next(err);
        res.status(201);
        res.json(question);
    });
});

// PUT /questions/:qID/answers/:aID
// Edit a specific answer
router.put('/:qID/answers/:aID', (req, res) => {
    req.answer.update(req.body, function(err, result) {
        if(err) return next(err);
        res.json(result);
    });
});

// DELETE /questions/:qID/answers/:aID
// Delete a specific answer
router.delete('/:qID/answers/:aID', (req, res) => {
    req.answer.remove(function(err){
        req.question.save(function(err, question){
            if(err) return next(err);
            res.json(question);
        });
    });
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Vote on a specific answer
router.post('/:qID/answers/:aID/vote-:dir', (req, res, next) => {
        if(req.params.dir.search(/^(up|down)$/) === -1) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        } else {
            req.vote = req.params.dir;
            next();
        }
    },(req, res, next) => {
        req.answer.vote(req.vote, function(err, question){
            if(err) return next(err);
            res.json(question);
        });
});

module.exports = router;