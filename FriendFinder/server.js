
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
//posting to friends object
app.post("/api/friends", function (req, res) {
    newfriend = req.body;
    console.log(newfriend);



    console.log(newfriend.scores + " new friend scores");

    // console.log("new    "+parseInt(newfriend.scores));
    var result = newfriend.scores.map(Number);
    console.log("result" + result);
    var closeFriend = [];
    console.log("friends ljsdflksfjklj"+friends);
    for (var i = 0; i < friends.length; i++) {

        console.log(friends[i].scores + " friend scores");
        //console.log(parseInt(friends[i].scores));
        // console.log("new score"+newScores+"friend scores"+friendsScores);
        difArray = _.difference(result, friends[i].scores);
        console.log(difArray);
        sum = difArray.map(Number).reduce(add);
        console.log("summing : "+sum);
        closeFriend.push(sum);
        ///minimum

      
        //closeFriend.sort();
        //foundFriend = closeFriend[0];
        //console.log()
        //console.log(closeFriend[0] + " is the colsest friend" + friends[i]);
        //
        //closeFriend.sort(sortNumber);
        console.log(closeFriend+"is the array of sorted numbers ");
    
        //foundFriend = friends[i];
        console.log("found friend \n\n"+foundFriend);
        
        ///
    }
     var min = Math.min.apply(Math,closeFriend);
     
        var index = closeFriend.indexOf(min);
        console.log(index+"is the index of min"+min);
        foundFriend = friends[index];
        console.log("close friends" + closeFriend);
    // for (var j = 0; j < friends.length; j++) {
    //     closeFriend.push(sum);
    //     if (closeFriend[j] < closeFriend[j + 1]) {
    //         foundFriend = closeFriend;
    //         console.log(closeFriend[j] + " is the colsest friend" + friends[j]);
    //     }
    // }
    friends.push(newfriend);
    res.json(foundFriend);
    fs.writeFile('./app/data/friends.json',  JSON.stringify(friends), 'utf-8', function(err){
        if(err) throw err;
    });
    console.log(friends);
});
function sortNumber(a,b) {
    return a - b;
}
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