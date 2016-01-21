var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require("spotify");
var fs = require("fs");
var request = require('request');
//process argv slice to get to the paramters we want for switch statement
var params = process.argv.slice(2);


switch(params[0]) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
   if(params[1]){  //if a song is put named in 4th paramater go to function
    spotifyIt();
  } else  {  //if blank call it blink 182's "whats my age again"
    spotifyIt(params[1] = "Whats my age again");
  }
    break;
  case "movie-this":
    if(params[1]){
      findMovie();
    } else {
      findMovie(params[1] = "Mr. Nobody"); //if blank, show info on the movie mr.nobody
    }
      break;
    case "do-what-it-says":
      spotifyIt(params[1] = "I want it that way");
      break;
  
  
}

function myTweets(){
   var client = new Twitter({  //from api docs, to get keys
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret
    });
    
  client.get('statuses/user_timeline', {screen_name: 'PherPher_'}, function (error, data, response){
    if(error) throw error;
    for(var i = 0; i < data.length; i++){
      
      var tweetResults = data[i].text + "\n";
      
      console.log(tweetResults); //displays last 20 tweets
      
      };
  });
}  

function spotifyIt() {
  spotify.search({ type: 'track', query: params[1] }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;  //from spotify npm docs
    }
    else{
    var songInfo = data.tracks.items[0];
    var songResult = console.log("the artist is", songInfo.artists[0].name)
                     console.log("the song name is", songInfo.name)
                     console.log("the album is called", songInfo.album.name)
                     console.log("here is a preview link", songInfo.preview_url)
    console.log(songResult);
    };
  });
}  

function findMovie() {
  request("http://www.omdbapi.com/?t=" + params[1] + "&y=&plot=short&r=json", function(error, response, body){
    var movieObject = JSON.parse(body);
    console.log("the title is", movieObject.Title)
    console.log("the year is", movieObject.Year)
    console.log("the IMDB Rating is", movieObject.imdbRating)
    console.log("the country is", movieObject.Country)
    console.log("the language is", movieObject.Language)
    console.log("the plot is", movieObject.Plot)
    console.log("the actors are", movieObject.Actors)
  });
};



