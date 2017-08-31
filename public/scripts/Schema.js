var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://admin:admin@ds155191.mlab.com:55191/kanban_board', function(err, db) {
  if (err) {
    console.log('Unable to connect to the server. Please start the server. Error:', err);
  } else {
    console.log('Connected to Server successfully!');
  }
});

var userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    common: Boolean
});

var User = mongoose.model('User', userSchema);

// var Till = new User({
//     id: 0,
//     name: "Till Schmidt",
//     email: "Till.Schmidt@tecalliance.net",
//     common: false
// });

// var Sebastian= new User({
//     id: 1,
//     name: "Sebastian Zink",
//     email: "Zink.Sebastian@tecalliance.net",
//     common: false
// });

var Georg= new User({
    id: 2,
    name: "Goerg Popp",
    email: "Georg.Popp@tecalliance.net",
    common: false
});

Georg.save(function(err, user) {
    if (err) {
        console.log(err);
    } else {
        console.log(`A new user named ${User.name} was added`)
    }
});