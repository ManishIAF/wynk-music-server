const Router = require("express");

const router = Router();

const {TopSearch,SearchSong,searchAlbum,SearchPlaylist,SearchPackage,ArtistsByName} = require('../Controlers/SearchController');

router.route("/song/:name").get(SearchSong);
router.route("/album/:name").get(searchAlbum);
router.route("/playlist/:name").get(SearchPlaylist);
router.route("/package/:name").get(SearchPackage);
router.route("/topsearch/:name").get(TopSearch);
router.route("/artist/:name").get(ArtistsByName);

module.exports = router;