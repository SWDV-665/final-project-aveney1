// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/jobapptracker", { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware calls for express js 
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var JobApp = mongoose.model('JobApp', {
    title: String,
    company: String, 
    status: String
});

// Get all items
app.get('/api/jobapptracker', function (req, res) {

    console.log("Listing application items...");

    //use mongoose to get all jobApplications in the database
    JobApp.find(function (err, jobApplications) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(jobApplications); // return all jobApplications in JSON format
    });
});


// Create an application item
app.post('/api/jobapptracker', function (req, res) {

    console.log("Creating application item...");

    JobApp.create({
        title: req.body.title,
        company: req.body.company,
        status: req.body.status,
        done: false
    }, function (err, jobApplication) {
        if (err) {
            res.send(err);
        }

        // create and return all the jobApplications
        JobApp.find(function (err, jobApplications) {
            if (err)
                res.send(err);
            res.json(jobApplications);
        });
    });

});

// Update item
app.put('/api/jobapptracker/:id', function (req, res) {
    const jobApplication = {
        title: req.body.title,
        company: req.body.company,
        status: req.body.status
    };
    console.log("Updating item - ", req.params.id);
    JobApp.updateOne({_id: req.params.id}, jobApplication, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete Item
app.delete('/api/jobapptracker/:id', function (req, res) {
    console.log("Deleting item - ", req.params.id);
    JobApp.deleteOne({
        _id: req.params.id
    }, function (err, jobApplication) {
        if (err) {
            console.error("Error deleting jobApplication ", err);
        }
        else {
            JobApp.find(function (err, jobApplications) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(jobApplications);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("JobApplication server listening on port  - ", (process.env.PORT || 8080));