const Router = require('express');
const router = Router();

const Auth = require('../middleware/Auth');
const verifyUser = require('../middleware/veryfyUser');
const Authenticate = require('../Controlers/AuthenticateController');

router.route('/').get(Auth,verifyUser,Authenticate);

module.exports = router;