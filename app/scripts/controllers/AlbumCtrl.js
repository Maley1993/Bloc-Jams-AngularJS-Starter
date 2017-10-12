(function() {
    function AlbumCtrl() {
      this.albumData = albumPicasso;
      this.songs = albumPicasso.songs
    };

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
