const Router = require("express");

const router = Router();

const {PackageByName,PackageById} = require('../Controlers/PackageController');

//***********************************Top Songs************************************************* */
router.route('/byName/:name').get(PackageByName);
router.route('/byId/:id').get(PackageById);


module.exports = router;