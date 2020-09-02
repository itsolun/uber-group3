const mongoose = require('mongoose');
var express = require('express')
var router = express.Router()

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const tripSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    token: String,
    available: Boolean,
    mobilenumber: Number,
});
const trip = mongoose.model("trip", tripSchema);



module.exports = router
