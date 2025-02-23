const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/siteController');

router.get('/', siteController.index);
router.post('/', siteController.create);
router.put('/', siteController.update);
router.delete('/', siteController.delete);
router.delete('/handle', siteController.handelAction);
module.exports = router;