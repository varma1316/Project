const express = require("express");
const app = express();
const port = 4000;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/Tourism");

const chatSchema = new mongoose.Schema({
    name: String,
    message: String
});

const Chat = mongoose.model("Chat", chatSchema);

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/queries.html", function (req, res) {
    res.sendFile(__dirname + "/queries.html");
});

app.get("/store", function (req, res) {
    Student.find({}).then(function (data) {
        res.render("student", {
            datalist: data
        });
    }).catch(function (err) {
        console.log("there is an error");
    });
});

app.post("/form1", function (req, res) {
    const newst2 = new Student2({
        name: req.body.name
    });
    newst2.save();
    res.redirect("/queries.html");
});

app.post("/storedata", function (req, res) {
    const newst = new Student({
        monument: req.body.monument,
        how_many: req.body.how_many,
        arrivals: req.body.arrivals
    });
    newst.save();
    res.redirect("/");
});

app.post("/storelogin", function (req, res) {
    const newst1 = new Student1({
        email: req.body.email,
        password: req.body.password
    });
    newst1.save();
    res.redirect("/");
});

// Socket.io handling
io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

    socket.on('chatMessage', function (msg) {
        const chatMessage = new Chat({
            name: msg.name,
            message: msg.message
        });
        chatMessage.save(function (err) {
            if (err) {
                console.log("Error saving chat message:", err);
            } else {
                io.emit('chatMessage', msg);
            }
        });
    });
});

http.listen(port, function () {
    console.log("the server is running in the port " + port);
});
