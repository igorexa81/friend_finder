// Import the list of friends
var friendsData = require("../data/friends");


// ROUTING


module.exports = function(app) {
  

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // add new friends entry
  
  
  app.post("/api/friends", function(req, res) {

    var newFriend = req.body;

    var userAnswers = newFriend.scores;

    //Calculate best friend match

    var matchName = '';
    var matchImage = '';
    var totalDifference = 1000;

    for(var i = 0; i < friendsData.length; i++){

      var diff = 0;

      for(var j = 0; j < userAnswers.length; j++){
        diff += Math.abs(friendsData[i].scores[j] - userAnswers[j]);
      }

      if (diff < totalDifference){
        totalDifference = diff;
        matchName = friendsData[i].name;
        matchImage = friendsData[i].photo;
      }
    }
      friendsData.push(newFriend);
      res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
  });

  
};
