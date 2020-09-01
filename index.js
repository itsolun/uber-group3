const express = require("express");
var router = express.Router()
const app = express();
app.use(express.json());


var drivers = require('./routes/driver');
app.use('/driver', drivers);

var trips = require('./routes/trip');
app.use('/trip', drivers);

var rider = require('./routes/rider')
app.use('/rider', rider);

app.listen(3000);



