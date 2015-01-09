var express = require("express");
var jobModel = require("./models/Job.js");
var jobsData = require("./jobs-data.js");

var app = express();

require("./jobs-service.js")(jobsData, app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://laur:bv802324@ds031661.mongolab.com:31661/jobfinder')
    .then(function() {
        console.log('connected to mongodb successfully!');
        jobModel.seedJobs();
    });

app.listen(process.env.PORT, process.env.IP);