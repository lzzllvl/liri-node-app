var twitter = require('twitter')
var twitterKeys = require('./keys.js');
var fs = require('fs');
var request = require('request');
var spotify = require('spotify');


/**
 * Node App For the interacting with twitter, spotify and omdb from the command
 * line. Accepts Command line arguments in the format
 * `node liri.js <function> "<arguments>"`
 *
 */

//TODO need to add resiliency to the program for the misuse cases.



//functions

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


var args = process.argv.slice(2);
var func = args[0];

if(func == "my-tweets") getTweets();
if(func == "movie-this") getMovie(args[1]);
if(func == "spotify-this-song") spotifyThis(args[1]);
if(func == "do-what-it-says") doRandom();



