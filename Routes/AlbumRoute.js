const Router = require("express")

const router = Router();

const {albumById,JustACall} = require('../Controlers/AlbumController');
// console.log('I am here too');
// router.route('/top/:language').get(TopAlbums);
router.route('/').get(JustACall);
router.route('/:id').get(albumById);

module.exports = router;