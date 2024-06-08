var mongoose = require("mongoose");

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

const BabyFactSchema = new mongoose.Schema({
    week: Number,
    fact: String,
});

const userSchema = new mongoose.Schema({
    name: {type:String, require:true},
    email: {type:String, require:true},
    password: {type:String, require:true},
});

const calendarDataSchema = new mongoose.Schema({
    activity: String,
    // date uses timestamp when data is logged.
    date: { type: Date, default: Date.now },
})

const Activity = mongoose.model("Activity", ActivitySchema, "Activity");
const BabyFact = mongoose.model("BabyFact", BabyFactSchema, "BabyFact");
const User = mongoose.model("User", userSchema, "User");
const CalendarData = mongoose.model("CalendarData", calendarDataSchema, "CalendarData");

module.exports = {Activity, BabyFact, User, CalendarData}