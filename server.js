/*===========================================
=            Requirement imports            =
===========================================*/
var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
mongoose.connect('mongodb://localhost/btpMinor');
var io = require('socket.io')(app.listen(3000));
/*-----  End of Requirement imports  ------*/

/*==========  Mongoose  ==========*/
var btpData;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    var dataSchema;
    console.log("connected");

    dataSchema = mongoose.Schema({
        cent: Array,
        num: Number,
        time: {
            type: Date,
            default: Date.now
        }
    });
    btpData = mongoose.model('btpData', dataSchema);
    io.on('connection', function(socket) {

        

        fs.watch('public/js/data', function(event, filename) {
            fs.readFile('public/js/data/' + filename, function(err, data) {
                if (!err) {
                    var args = JSON.parse(data);
                    
                    if (args) {
                        var newData = new btpData({
                            cent: args.cent,
                            num: args.num
                        });

                        newData.save(function(error, newData) {
                            if (error) {
                                console.log("error in saving");
                            }
                            console.log(newData);
                        });

                        
                        socket.emit('updated', args);
                    }
                }

            });

        });
    });
});

/*====================================
=            watch the json            =
====================================*/





/*==========  Receive the request and send response  ==========*/
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
    res.sendfile("/index.html");
});


/*==========  Socket.io  ==========*/
