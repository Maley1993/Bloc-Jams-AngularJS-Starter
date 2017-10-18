(function() {
  function SongPlayer() {
    var SongPlayer = {};

    /**
    * @desc object thats hold current song
    * @type {Object}
    */
    var currentSong = null;

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function playSong
    * @desc plays currentBuzzObject and sets value of playing to true
    * @param {Object} song
    */

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };


    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    currentSong = song;
    };

    /**
    * @function play
    * @desc adds play function as property to the SongPlayer object. play function sets the current song file based on the row that is clicked in the album screen, plays the buzz sounds file for the row, and sets the value of 'playing' to true.
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             playSong(song);
         }
       }
    };


    /**
    * @function pause
    * @desc adds pause function as property to the SongPlayer object. pause function pauses the buzz sound file and sets value of 'playing' to false.
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
