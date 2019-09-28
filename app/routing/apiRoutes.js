var friends = require('../data/friends.js');

// Export the function
module.exports = function (app) {

  // Sets the get for the api/friends route
  app.get('/api/friends', function (req, res) {
    res.json(friends);
  });

  // Set the post for the api/friends route
  app.post('/api/friends', function (req, res) {
    // Set variables only needed for the post
    var bestMatch = {
      name: "",
      photo: "",
      difference: 1000
    };

    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference = 0;

    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;

      for (var j = 0; j < friends[i].scores[j]; j++) {
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        if (totalDifference <= bestMatch.difference) {
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.difference = totalDifference;
        }
      }
    }

    friends.push(userData);
    res.json(bestMatch);

  })
};