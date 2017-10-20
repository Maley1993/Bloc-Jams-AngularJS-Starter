(function() {
  function SongPlayer(fixtures) {
    var SongPlayer = {};

    /**
    * @desc stores current album information
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc buzz object audio file
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
    * @desc stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      SongPlayer.currentSong = song;
    };

    /**
    * @function getSongIndex
    * @desc retreives the index of the current song that is playing
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @desc object that holds current song
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @function play
    * @desc adds play function as property to the SongPlayer object.
            play function sets the current song file based on the row that is
            clicked in the album screen, plays the buzz sounds file for the row,
            and sets the value of 'playing' to true.
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             playSong(song);
         }
       }
    };

    /**
    * @function pause
    * @desc adds pause function as property to the SongPlayer object. pause
            function pauses the buzz sound file and sets value of 'playing' to
            false.
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function previous
    * @desc
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
    };

    return SongPlayer;
  }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures',SongPlayer]);
})();
