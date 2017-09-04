var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    bodyParser = require('body-parser');

app.use(express.static(__dirname + ('/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/get/Backlogs', function (req, res) {
    MongoClient.connect('mongodb://szi:0800@ds155191.mlab.com:55191/kanban_board', function (err, db) {
        var bugCollection = db.collection('bugs');
        bugCollection.find().toArray(function (err, bugs) {
            if (err) {
                console.log(err);
            } else {
                res.json(bugs);
            }
        });
    });
});

app.get('/get/Tasks', function (req, res) {
    MongoClient.connect('mongodb://szi:0800@ds155191.mlab.com:55191/kanban_board', function (err, db) {
        var taskCollection = db.collection('tasks');
        taskCollection.find().toArray(function (err, tasks) {
            if (err) {
                console.log(err);
            } else {
                res.json(tasks);
            }
        });
    });
});

app.get('/get/Users', function (req, res) {
    MongoClient.connect('mongodb://szi:0800@ds155191.mlab.com:55191/kanban_board', function (err, db) {
        var userCollection = db.collection('users');
        userCollection.find().toArray(function (err, users) {
            if (err) {
                console.log(err);
            } else {
                res.json(users);
            };
        });
    });
});

app.post('/post/backlog', function (req, res) {
    MongoClient.connect('mongodb://szi:0800@ds155191.mlab.com:55191/kanban_board', function (err, db) {
        var backlogCollection = db.collection('bugs');
        backlogCollection.insert({
            "state": "index",
            "acceptance_Criteria": req.body.acceptanceCriteria,
            "description": req.body.description,
            "github_Url": req.body.issue,
            "area": req.body.area,
            "tags": req.body.tags,
            "label": req.body.titel,
            "backlog_Or_Bug": req.body.backlog,
            "prio": req.body.prio,
            "user": req.body.user
        });
        var backlogCollection = db.collection('bugs');
        backlogCollection.find().toArray(function (err, bugs) {
            if (err) {
                console.log(err);
            } else {
                res.json(bugs);
            }
        });
    });
});
app.post('/post/NewTask', function (req, res) {
    MongoClient.connect('mongodb://szi:0800@ds155191.mlab.com:55191/kanban_board', function (err, db) {
        var taskCollection = db.collection('tasks');
        taskCollection.insert({
            "user": req.body.user,
            "prio": req.body.prio,
            "estimate": req.body.estimate,
            "label": req.body.label,
            "description": req.body.description,
            "comments": req.body.comments,
            "state": req.body.state,
            "kanban_id": req.body.kanban_id
        });
        var taskCollection = db.collection('tasks');
        taskCollection.find().toArray(function (err, tasks) {
            if (err) {
                console.log(err);
            } else {
                res.json(tasks);
            }
        });
    });
});

app.post('/post/editTask', function (req, res) {
    MongoClient.connect('mongodb://szi:0800@ds155191.mlab.com:55191/kanban_board', function (err, db) {
        var taskCollection = db.collection('tasks');
        taskCollection.edit({
            "user": req.body.user,
            "prio": req.body.prio,
            "estimate": req.body.estimate,
            "label": req.body.label,
            "description": req.body.description,
            "comments": req.body.comments,
            "state": req.body.state,
            "kanban_id": req.body.kanban_id
        });
        var taskCollection = db.collection('tasks');
        taskCollection.find().toArray(function (err, tasks) {
            if (err) {
                console.log(err);
            } else {
                res.json(tasks);
            }
        });
    });
});

app.listen(3001, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Function! Server has started on port 3001.....');
    }
});
