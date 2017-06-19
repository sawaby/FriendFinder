
var express = require("express");
var app = express();
var difference = require('lodash.difference');
var bodyParser = require("body-parser");
var path = require("path");
var route = require("./app/routing/htmlRoutes.js");
var PORT = process.env.PORT || 3000;
var friends = require("./app/data/friends.json");
var _ = require("underscore");
var fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


//route.route();
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/home.html"));
});

app.get("/survey", function (req, res) {
    //res.json("hellow world");
    res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});
app.get("/api/friends", function (req, res) {
    res.json(friends);
});
var newfriend;
var foundFriend;
var difArray;
//posting to friends object
app.post("/api/friends", function (req, res) {
    newfriend = req.body;
    console.log(newfriend);
    console.log(newfriend.scores + " new friend scores");
    // console.log("new    "+parseInt(newfriend.scores));
    var result = newfriend.scores.map(Number);
    console.log("result" + Array(result));
    var closeFriend = [];
    console.log("friends ljsdflksfjklj" + friends);
    for (var i = 0; i < friends.length; i++) {
        console.log(typeof (Array(result)) + "result type");
        var ar = Array(friends[i].scores.map(Number));
        console.log(typeof (ar) + " friend scores");
        // difArray = _.difference(result.map(Number), friends[i].scores.map(Number));
        difArray = _.difference(result, ar);
        console.log(" the arary result of difference is : " + difArray);
        sum = difArray.reduce(add);
        console.log("summing : " + sum);
        closeFriend.push(sum);
        console.log(closeFriend + "is the array of close friends numbers ");
        console.log("found friend \n\n" + foundFriend);
    }
    var min = Math.min.apply(Math, closeFriend);
    var index = closeFriend.indexOf(min);
    console.log(index + "is the index of min" + min);
    foundFriend = friends[index];
    console.log("close friends" + closeFriend);
    friends.push(newfriend);
    res.json(foundFriend);
    fs.writeFile('./app/data/friends.json', JSON.stringify(friends), 'utf-8', function (err) {
        if (err) throw err;
    });
    console.log(friends);
});
var dif;
function add(a, b) {
    return a + b;
}
var sum;

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});