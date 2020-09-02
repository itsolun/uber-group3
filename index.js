const express = require("express");
const app = express();

app.use(express.json());


var drivers = require('./routes/driver');
app.use('/driver', drivers);

var trips = require('./routes/trip');
app.use('/trip', drivers);


app.listen(9000);
