const Router = require('express');

const router = Router();

const {listsByName,listsById} = require('../Controlers/listsController');

router.route('/:name').get(listsByName);
router.route('/byId/:id').get(listsById);

module.exports = router;