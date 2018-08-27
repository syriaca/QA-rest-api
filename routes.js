'use strict';

const express = require('express');
const router = express.Router();

// GET /questions
// Route for questions collection
router.get('/', (req, res) => {
    res.json({
        response: 'You sent me a GET request'
    });
});

// POST /questions
// Route for creating questions
router.post('/', (req, res) => {
    res.json({
        response: 'You sent me a POST request',
        body: req.body
    });
});

// GET /questions/:id
// Route for specific questions
router.get('/:id', (req, res) => {
    res.json({
        response: 'You sent me a GET request for ID' + req.params.id
    });
});


module.exports = router;