
var express = require("express");
var app = express();
module.exports.route = function(){
    app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "home.html"));
    });

    app.get("/survey", function(req, res){
        res.json("hellow world");
        res.sendFile(path.join(__dirname, "./app/public/survey.html"));
    });
}

