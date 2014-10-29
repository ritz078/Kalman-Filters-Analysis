/*===========================================
=            Requirement imports            =
===========================================*/
var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
var host = "127.0.0.1";
mongoose.connect('mongodb://localhost/btpMinor');
var io = require('socket.io')(app.listen(3000));
/*4181570431003362
6/18 150*/
/*-----  End of Requirement imports  ------*/

/*==========  Mongoose  ==========*/
var message;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    var messageSchema;
    console.log("yay");

    messageSchema = mongoose.Schema({
        user: String,
        time: String,
        message: String,
        dp: String
    });
    message = mongoose.model('message', messageSchema);
});

var i = 1;
/*====================================
=            watch the json            =
====================================*/
io.on('connection', function(socket) {

    fs.watch('public/js/data', function(event, filename) {
        fs.readFile('public/js/data/' + filename, function(err, data) {
            if (data!==undefined) {
                var args = JSON.parse(data);
                if(args)
                socket.emit('updated', args);
            }

        });

    });
});




/*==========  Receive the request and send response  ==========*/
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
    res.sendfile("/index.html");
});

/*==========  Socket.io  ==========*/


/*==========  REST api  ==========*/
app.get('/shoutbox/data', function(req, res) {
    message.find({}).sort({
        'time': -1
    }).limit(5).exec(function(err, data) {
        res.send(data);
    });
});
