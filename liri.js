var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require("spotify");
var fs = require("fs");
var request = require('request');

var params = process.argv.slice(2);


switch(params[0]) {
  case "my-tweets":
    myTweets();
    break;
  
}

function myTweets(){
  var client = new Twitter(keys.twitterKeys);
    
  client.get('statuses/user_timeline', {screen_name: 'PherPher_'}, function (error, data, response){
    if(error) throw error;
    for(var i = 0; i < data.length; i++){
      
      var tweetResults = data[i].text + "\n";
      
      console.log(tweetResults);
      
      };
  });
}  




