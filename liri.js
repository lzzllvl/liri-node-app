/**
 * Node App For the interacting with twitter, spotify and omdb from the command
 * line. Accepts Command line arguments in the format
 * `node liri.js <function> "<arguments>"`
 * Author - Gregory Lee for UCSD Coding bootcamp
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

var getMovie = (movieName) => {
  console.log("running getMovie(" + movieName + ")");
}

var spotifyThis = (songName) => {
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


