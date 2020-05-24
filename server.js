var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var jwt = require('jwt-simple')
var bcrypt = require('bcrypt')
var Volunteer = require('./backend/models/volunteer.js');
var Family = require('./backend/models/family')

app.use(cors()); 
app.use(bodyParser.json());

app.post('/volunteerregister', (req, res) => {
    var volunteerData = req.body;
    var volunteer = new Volunteer((volunteerData));
    volunteer.save((err, newvolunteer) => {
        if (err)
            return res.status(401).send({ message: 'Error saving ' })
        var payload = { sub: newvolunteer._id }

         var token = jwt.encode(payload, '123')

        res.status(200).send({ token })

    })
})

app.post('/familyregister', (req, res) => {
    var familyData = req.body;
    var family = new Family((familyData));
    family.save((err, newfamily) => {
        if (err)
            return res.status(401).send({ message: 'Error saving ' })
        var payload = { sub: newfamily._id }

         var token = jwt.encode(payload, '123')

        res.status(200).send({ token })

    })
})



var dbOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auto_reconnect: true
  };
mongoose.connect("  mongodb+srv://saisarika:saisarika@cluster0-o6ntu.mongodb.net/ayuda?retryWrites=true&w=majority", dbOptions);
  
  mongoose.connection.on('connected', function () {
    console.log("Connected to DB");
  });
  mongoose.connection.on('error', function (err) {
    console.log("Error while connecting to DB: " + err);
  });
port = process.env.PORT || 8000;
app.listen(port);