require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./dbConnect");
const PORT = process.env.PORT || 8005;

let { Activity, BabyFact, User , CalendarData}= require("../Models/schemas");

// Middleware
app.use(cors());
app.use(express.json());

// Route handlers below.
app.get("/api/NewDad-App", (req, res) => {
    res.json({ message: "Welcome to the MongoDB database for the NewDad application." });
});

// Getting ACTIVITIES
app.get("/api/NewDad-App/Activities", async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// Getting BABYFACTS
app.get("/api/NewDad-App/BabyFacts", async (req, res) => {
    try {
        const BabyFacts = await BabyFact.find();
        res.json(BabyFacts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// Getting CALENDAR DATA
app.get('/api/NewDad-App/Calendar', async (req, res) => {
    try {
        const calendarData = await CalendarData.find();
        res.json(calendarData);
    } catch (error) {
        console.error('Error fetching calendar data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Posting CALENDAR DATA
app.post("/api/NewDad-App/Calendar", async (req, res) => {
    try {
        const { activity } = req.body;
        const newCalendarEntry = new CalendarData({ activity });
        await newCalendarEntry.save();
        res.status(201).json(newCalendarEntry);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// UPDATE Calendar Data
app.put('/api/NewDad-App/Calendar/:id', async (req, res) => {
    try {
        const updatedActivity = await CalendarData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedActivity);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// DELETE Calendar Data Activity
app.delete('/api/NewDad-App/Calendar/:id', async (req, res) => {
    try {
        await CalendarData.findByIdAndDelete(req.params.id);
        res.send('Activity deleted');
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Getting USERS
app.get('/api/NewDad-App/Users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// CREATE USERS
app.post('/api/NewDad-App/Users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Starting Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
