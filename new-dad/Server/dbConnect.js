'use strict';
const Mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/NewDad-App";

Mongoose.connect(DB_URI)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch(error => console.log('MongoDB Error:', error.message));

const db = Mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;