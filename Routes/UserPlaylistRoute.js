const Router = require("express");
const Auth = require('../middleware/Auth');
const verifyUser = require('../middleware/veryfyUser');

const router = Router();

const {getUserPlaylist,SaveUserPlaylist,UserplaylistByName,UserPlaylistById,removefromPlaylist} = require('../Controlers/UserPlaylistController');

router.route("/").get(Auth,verifyUser,getUserPlaylist).post(Auth,verifyUser,SaveUserPlaylist).delete(Auth,verifyUser,removefromPlaylist)
router.route("/byName/:name").get(Auth,verifyUser,UserplaylistByName)
router.route("/byId/:id").get(Auth,verifyUser,UserPlaylistById)

module.exports = router;