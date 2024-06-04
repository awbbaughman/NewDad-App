'use strict';
const express = require("express");
const Mongoose = require('mongoose');


// if the connection fails, try 127.0.0.1 instead of localhost below
const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/NewDad";

Mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB Connected');
        const app = createServer();
        const port = process.env.PORT || 8005;
    })
    .catch(error => console.log('MongoDB Error:' + error.message));

    const db = Mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));