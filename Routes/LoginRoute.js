const Router = require('express');
const router = Router();

const verifyUser = require('../middleware/veryfyUser');
const createUser = require('../middleware/createUser');
const {sendotp,login,sendLink} = require('../Controlers/LoginController');

router.route('/sendotp').post(verifyUser,createUser,sendotp);
router.route('/sendlink').post(verifyUser,sendLink);

router.route('/').post(verifyUser,login);

module.exports = router;