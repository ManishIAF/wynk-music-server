const Router = require('express');
const router = Router();

const {artistByGenre,artistinfo,ArtistSongs,ArtistsById} = require('../Controlers/ArtistController');

router.route('/title/:title').get(artistByGenre);
router.route('/Id/:id').get(ArtistsById);

router.route('/artistsinfo/:name').get(artistinfo)
router.route('/artistssongs/:name').get(ArtistSongs)

module.exports = router;