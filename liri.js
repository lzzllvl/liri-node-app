/**
 * Node App For the interacting with twitter, spotify and omdb from
 * the command line. Accepts Command line arguments in the format
 *    `node liri.js <function> "<arguments>"`
 * See package.json for dependencies and other information
 * Author - Gregory Lee for UCSD Coding Bootcamp.
 */


//require node modules
let twitter = require('twitter')
let twitterKeys = require('./keys.js');
let fs = require('fs');
let request = require('request');
let spotify = require('spotify');

//TODO need to add resiliency to the program for the misuse cases.

//function declarations
let getTweets = (number=20) => {
  console.log("running getTweets()");
  var client = new twitter(twitterKeys.twitterKeys);
  var params = {
                  screen_name: 'Korn_E_Ninja',
                  count: number
               };
  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if(!error){
      tweets.forEach(val => {
        var date = val.created_at.split("+")[0].trim();
        var logString = `By: ${val.user.name}\n`
                      + `Text: ${val.text}\n`
                      + `Created On: ${date}\n`
        console.log(logString);
      });
    } else {
      console.log(error)
    }
  })
}

let getMovie = (movieName="Mr. Nobody") => {
  console.log("running getMovie(" + movieName + ")");
  movieName  = movieName.replace(" ", "+");
  let url = "http://www.omdbapi.com/?t=" + movieName;
  request(url, (err, res, body) => {
    if(!err && res.statusCode === 200){
      let mov = JSON.parse(body);
      let rottenTomatoes = mov.Ratings[1].Value;
      console.log(mov.Title, mov.Year);
      console.log(mov.imdbRating);
      console.log(mov.Country);
      console.log(mov.Language);
      console.log(mov.Plot);
      console.log(mov.Actors);
      console.log("Rotten Tomatoes - " + rottenTomatoes);
    } else {
      console.log("Status Code: " + res.statusCode, err);
    }
  })
}

let spotifyThis = (songName="The Sign") => {
  console.log("running spotifyThis(" + songName + ")");
  var queryString = "https://api.spotify.com/v1/search?q="
                      + songName.replace(" ", "+")
                      + "&type=track";
  spotify.get(queryString, (err, data) => {
    if(!err) {
      console.log(data.tracks.items[0].album.artists);
      console.log(data.tracks.items[0]);
      //console.log(JSON.stringify(data, null, 2));
      //console.log(JSON.parse(data, null, 2));
    } else {
      //console.log(err);
    }
  });
}

let doRandom = () => {
  console.log("running doRandom()");
  fs.readFile('random.txt', 'utf8', (err, data) =>{
    console.log(data);
    var temp = data.split(", ");
    var func = temp[0];
    var arg = temp[1];
    funcSwitcher(func, arg);
  })
}

let funcSwitcher = (func, arg) => {
  let usage = "Usage: node liri.js <process-name> 'process arguments'\n";
  switch(func){
    case "my-tweets":
      getTweets(arg);
      break;
    case "movie-this":
      getMovie(arg);
      break;
    case "spotify-this-song":
      spotifyThis(arg);
      break;
    case "do-what-it-says":
      doRandom();
      break;
    default:
      console.log("Invalid Input: '" + func + "' is not a valid process-name");
      console.log(usage);
  }
}

//script
let args = process.argv.slice(2);
let funcName = args[0];
funcSwitcher(funcName, args[1]);

