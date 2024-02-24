const { Router } =  require("express");

const TopArtistsPlaylists = require('../Controlers/TopArtistPlaylistsControllers')

const router = Router()

router.get('/:singer',TopArtistsPlaylists)

module.exports = router