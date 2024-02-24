const {Router} = require('express')

const router = Router()

const {PlaylistById} = require('../Controlers/PlaylistController')

router.route('/byId/:id').get(PlaylistById)


module.exports = router