const mongoose = require('mongoose');
var express = require('express')
var router = express.Router()

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const driverSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    token: String,
    available: Boolean,
    mobilenumber: Number,
});
const driver = mongoose.model("driver", driverSchema);


router.post('/', function (req, res) {
    // Login
    driver.findOne({ username: req.params.username, password: req.params.password })
        .exec()
        .then(usr => {
            res.json("Done");
        })
        .catch(err => {
            res.json(err);
        });
})
router.post('/logout', function (req, res) {
    // Logout
})
router.post('/register', function (req, res) {
    const newdriver = new driver({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        available: req.body.available,
        mobilenumber: req.body.mobilenumber,
        token: "123456879" + req.body.username + "abcdef"
    });
    newdriver
        .save()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err)
        });
})
router.post('/forgetpassword', function (req, res) {
    // Forget Password
})
router.post('/changepassword', function (req, res) {
    // Change Password
})
router.put('/update', function (req, res) {
    // Update profile
})
router.get('/profile', function (req, res) {
    // Profile
})
router.post('/trip/finish', function (req, res) {
    // 
})
router.post('/trip/cancle', function (req, res) {
    // 
})
router.post('/trip/order', function (req, res) {
    // 
})
router.get('/trip/getava', function (req, res) {
    // 
})

module.exports = router
