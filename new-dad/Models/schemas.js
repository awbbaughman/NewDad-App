const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    activity: String,
    availability: Number,
    type: String,
    participants: Number,
    price: Number,
    accessibility: String,
    duration: String,
    kidFriendly: Boolean,
    link: String,
    key: String
});

const requestActivity = mongoose.model("Activity", requestActivitySchema);

const BabyFactSchema = new mongoose.Schema({
    week: Number,
    fact: String,
});

const requestBabyFact = mongoose.model("BabyFact", requestBabyFactSchema);


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

module.exports = {
    requestActivity: requestActivity,
    requestBabyFact: requestBabyFact
  }