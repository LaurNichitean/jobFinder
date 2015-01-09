var mongoose = require("mongoose");
var Promise = require("bluebird");
var jobModel = require("./models/Job.js");
var Job = mongoose.model('Job');

var findJobs = function(query) {
    return Promise.cast(Job.find(query).exec());
};

var createJob = Promise.promisify(Job.create, Job);

var jobs = [{
    title: 'Waiter',
    description: 'You will be putting food on peoples tables'
}, {
    title: 'Cook',
    description: 'You will be making bagels'
}, {
    title: 'Programmer',
    description: 'You will be making web apps'
}, {
    title: 'Axe Maker',
    description: 'Axes'
}];

// exports

exports.findJobs = findJobs;
exports.jobs = jobs;

exports.seedJobs = function() {

    return findJobs({}).then(function(collection) {
        if (collection.length === 0) {
            return Promise.map(jobs, function(job) {
                return createJob(job);
            });
        }
    });
};

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

exports.saveJob = createJob;


