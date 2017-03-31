/**
 * Node App For the interacting with twitter, spotify and omdb from
 * the command line. Accepts Command line arguments from process.
 *  Usage:  `node liri.js <function> "<arguments>"`
 * See package.json for dependencies and other information
 * Author - Gregory Lee for UCSD Coding Bootcamp.
 */


//require node modules
let twitter = require('twitter')
let twitterKeys = require('./keys.js');
let fs = require('fs');
let request = require('request');
let spotify = require('spotify');


//function declarations

/** getTweets()
  * abstract - gets tweets from Korn_E_Ninja twitter account and console.logs them
  * @param {Number} number - number of tweets to request, default - 20
  * @return {void}
  */
let getTweets = (number=20) => {
  let client = new twitter(twitterKeys.twitterKeys);
  let params = {
                  screen_name: 'Korn_E_Ninja',
                  count: number
               };
  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if(!error){
      tweets.forEach(val => {
        let date = val.created_at.split("+")[0].trim();
        let logString = `By: ${val.user.name}\n`
                      + `Text: ${val.text}\n`
                      + `Created On: ${date}\n`
        console.log(logString);
      });
    } else {
      console.log(error)
    }
  })
}

/** getMovie()
  * abstract - gets movie data from omdb API and console.logs some relevant data
  * @param {String} movieName - the movie to search omdb for
  * @return {void}
  */
let getMovie = (movieName="Mr. Nobody") => {
  movieName  = movieName.replace(" ", "+");
  let url = "http://www.omdbapi.com/?t=" + movieName;
  request(url, (err, res, body) => {
    if(!err && res.statusCode === 200){
      let mov = JSON.parse(body);
      let rottenTomatoes = mov.Ratings[1].Value;
      let logString = `Movie: ${mov.Title} - ${mov.Year}\n`
                    + `Rating: ${mov.imdbRating}\n`
                    + `Country: ${mov.Country}\n`
                    + `Language(s): ${mov.Language}\n`
                    + `Plot: ${mov.Plot}\n`
                    + `Starring: ${mov.Actors}\n`
                    + `Percent Fresh (Rotten Tomatoes): ${rottenTomatoes}`;
      console.log(logString);
    } else {
      console.log("Status Code: " + res.statusCode, err);
    }
  })
}

/** spotifyThis()
  * abstract - gets the track info from Spotify API search endpoint and logs data
  * @param {String} songName - the song/track to search spotify for
  * @return {void}
  */
let spotifyThis = (songName="She Knows") => {
  let queryString = "https://api.spotify.com/v1/search?q="
                      + songName.replace(" ", "+")
                      + "&type=track&limit=1";
  spotify.get(queryString, (err, data) => {
    if(!err) {
      let track = data.tracks.items[0];
      let artistNameArray= [];
      track.artists.forEach(val => artistNameArray.push(val.name));
      let logString = `Artist(s): ${artistNameArray.join(", ")}\n`
                    + `From Album: ${track.album.name}\n` // album name
                    + `Track Name: ${track.name}\n` // track name
                    + `Spotify Url: ${track.external_urls.spotify}\n`;
      console.log(logString);
    } else {
      console.log(err);
    }
  });
}

/** doRandom()
  * abstract - reads random.txt and calls funcSwitcher with data from it
  * @return {void}
  */
let doRandom = () => {
  fs.readFile('random.txt', 'utf8', (err, data) =>{
    let temp = data.split(", ");
    let func = temp[0];
    let arg = temp[1];
    funcSwitcher(func, arg);
  })
}

/** funcSwitcher()
  * abstract - calls the appropriate function with appropriate arguments based
  * on the values passed in from the command line.
  * @param {String} func - the string that that corresponds to a function
  * @param {String} arg - the argument for the function call
  * @return {void}
  */
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

