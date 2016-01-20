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
  case "spotify-this-song":
    if(params[1]){  //if a song is put named in 4th paramater go to function
    spotifyIt();
  } else {
    spotifyIt("What\'s my age again");
    break;
  }
  
}

function myTweets(){
   var client = new Twitter({
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret
    });
    
  client.get('statuses/user_timeline', {screen_name: 'PherPher_'}, function (error, data, response){
    if(error) throw error;
    for(var i = 0; i < data.length; i++){
      
      var tweetResults = data[i].text + "\n";
      
      console.log(tweetResults);
      
      };
  });
}  

function spotifyIt(song) {
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    else{
    var songInfo = data.tracks.items[0];
    var songResult = console.log(songInfo.artists[0].name)
                     console.log(songInfo.name)
                     console.log(songInfo.album.name)
                     console.log(songInfo.preview_url)
    console.log(songResult);
    };
  });
}  


