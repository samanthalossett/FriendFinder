var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var totalDifference = 0;
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        var map = userScores.map(function (item) {
            return parseInt(item, 10);
        });
        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: map
        };
        console.log("Name of new User: " + userName);
        console.log("User Scores: " + userScores);

        var b = map.reduce((a, map) => a + map, 0);
        console.log("Total score of new user: " + b);
        console.log("-------------------------------");

        //for loop to loop through our database of possible matches (GOT characters)//
        for (var i=0; i< friends.length; i++){
            console.log("Name of possible GOT Best Friend: " + friends[i].name);
            totalDifference= 0;


        var bfriendScore= friends[i].scores.reduce((a, b) => a + b, 0);
        console.log("Total friend Score: " + bfriendScore);
        totalDifference += Math.abs(b - bfriendScore);
        console.log("-------------------------------");

        if(totalDifference <= bestMatch.friendDifference){
            bestMatch.name = friends[i].name;
            bestMatch.photo = friends[i].photo;
            bestMatch.friendDifference= totalDifference;
        }
        console.log("Total Difference between the two peoples scores: " + totalDifference);
        }
        console.log(" Best match for: " + userName + " : " + bestMatch.name);
        friends.push(userData);
        console.log("New User Added");
        console.log(userData);
        res.json(bestMatch);

    });
};
