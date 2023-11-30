const express = require('express');
const cors = require('cors');

const applyMiddleware = (app) => {
    app.use(cors({
        origin: ['https://fantastic-muffin-b6e116.netlify.app', 'http://localhost:5173'
        ],
        credentials: true
    }));
    app.use(express.json());
}

module.exports = applyMiddleware;