/**
 * Node App For the interacting with twitter, spotify and omdb from
 * the command line. Accepts Command line arguments in the format
 *    `node liri.js <function> "<arguments>"`
 * See package.json for dependencies and other information
 * Author - Gregory Lee for UCSD Coding Bootcamp.
 */


//require node modules
var twitter = require('twitter')
var twitterKeys = require('./keys.js');
var fs = require('fs');
var request = require('request');
var spotify = require('spotify');



//TODO need to add resiliency to the program for the misuse cases.



//function declarations
var getTweets = () => {
  console.log("running getTweets()");
}

var getMovie = (movieName="Mr. Nobody") => {
  console.log("running getMovie(" + movieName + ")");
  movieName  = movieName.replace(" ", "+");
  var url = "http://www.omdbapi.com/?t=" + movieName;
  request(url, (err, res, body) => {
    if(!err && res.statusCode === 200){
      var mov = JSON.parse(body);
      var rottenTomatoes = mov.Ratings[1].Value;
      console.log(mov.Title, mov.Year);
      console.log(mov.imdbRating);
      console.log(mov.Country);
      console.log(mov.Language);
      console.log(mov.Plot);
      console.log(mov.Actors);
      console.log("Rotten Tomatoes - " + rottenTomatoes);

    } else {
      console.log(err);
    }
  })
}

var spotifyThis = (songName="The Sign") => {
  console.log("running spotifyThis(" + songName + ")");
}

var doRandom = () => {
  console.log("running doRandom()");
}



//script
var usage = "Usage: node liri.js <process-name> 'process arguments'\n"
var args = process.argv.slice(2);
var func = args[0];

switch(func){
  case "my-tweets":
    getTweets();
    break;
  case "movie-this":
    getMovie(args[1]);
    break;
  case "spotify-this-song":
    spotifyThis(args[1]);
    break;
  case "do-what-it-says":
    doRandom();
    break;
  default:
    console.log("Invalid Input: '" + func + "' is not a valid process-name");
    console.log(usage);
}


