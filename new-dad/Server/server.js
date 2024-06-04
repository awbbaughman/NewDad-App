const express = require("express");
const app = express();
const PORT = process.env.PORT || 8005;
let Activity, BabyFact = require("../Models/schemas");

let dbConnect = require("./dbConnect");
let userRoutes = require('./routes/userRoutes');

require("dotenv").config();

app.use(express.json());

app.get("/api/NewDad-App", (req, res) => {
    res.json({ message: "Welcome to the MongoDB database for the NewDad application." });
    });


app.get("/api/NewDad-App/Activities", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
  }
});

app.get("/api/NewDad-App/BabyFacts", async (req, res) => {
    try {
      const BabyFacts = await BabyFact.find();
      res.json(BabyFacts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
  });

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
console.log(`Server is running on port${PORT}.`);
});