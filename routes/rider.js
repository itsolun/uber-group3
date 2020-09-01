var express = require('express')
var router = express.Router()
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const RiderSchema = mongoose.Schema({
  username: String,
  passowrd: String,
  email:String,
  token: String,
  role:String,
  CurrentLocation: String,
  available:String,
  MobileNumber:String
});

const User = mongoose.model("User", RiderSchema);

router.get('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
        if (user.password == req.body.password);
        return user.token;
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });

})

router.get('/register', function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email:req.body.email,
        role:"rider",
        CurrentLocation: "",
        available:"",
        MobileNumber:req.body.MobileNumber
      });
    
      user
        .save()
        .then(user => {
          console.log(user);
          res.status(200).send(user);
        })
        .catch(err => {
          console.log(err);
          res.status(400).send(err);
        });
})



module.exports = router