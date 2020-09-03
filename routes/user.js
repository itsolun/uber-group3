const mongoose = require("mongoose");
const express = require('express');
const Joi = require('joi');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    token: String,
    role: String,
    currentlocation: { type: String, coordinates: [Number] }, //{ type: "Point", coordinates: [Number] }
    available: Boolean,
    mobile: Number,
    car: { type: Schema.Types.ObjectId, ref: 'Car' }
});
const User = mongoose.model('User', userSchema);

// const carSchema = Schema({
//     carmodel: String,
//     caryear: Number,
//     license: String,
//     platnumbers: String,
//     driver: { type: Schema.Types.ObjectId, ref: 'User' }

// });

//const Car = mongoose.model('Car', carSchema);


//validation schema
const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    role: Joi.string().min(5).max(255).required(),
    mobile: Joi.number().required()
})


//get all users by role (done)
router.get('/All/:role', function (req, res) {
    User.find({ role: req.params.id })
        .exec()
        .then(use => {
            for (i = 0; i < use.length; i++)
                console.log(use[i]);
            res.status(200).json(use);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
})


//get by username (done)
router.get('/:username', function (req, res) {
    User.findOne({ _iusernamed: req.params.username })
        .exec()
        .then(use => {
            console.log(use);
            res.status(200).send(use);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
})


//create new user (done)
router.post('/create', async (req, res) => {
    // validate the user's info
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        const newUser = new Product({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            token: req.body.username + req.body.password,
            role: req.body.role,
            available: 0,
            mobile: req.body.mobile
        });

        newUser
            .save()
            .then(use => {
                console.log(use);
                res.status(200).send(use);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
    }
});


//delete user by usernmae (done)
router.delete('/:username', function (req, res) {
    User.remove({ username: req.params.username })
        .exec()
        .then(use => {
            console.log("User has been deleted");
            res.status(200).send(use);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
})

//update user's info by username (done)
router.post('/update/:username', function (req, res) {
    User.update({ username: req.params.username }, {
        password: req.body.password,
        email: req.body.email,
        role: req.body.role,
        mobile: req.body.mobile
    })
        .exec()
        .then(use => {
            console.log(use);
            res.status(200).send(use);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
})


//get all trips by date
router.get('/allTrips/:date', function (req, res) {
    User.find({})
        .exec()
        .then(
            //
        )
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
})

module.exports = router