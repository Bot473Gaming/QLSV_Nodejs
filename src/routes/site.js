const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/siteController');

//Students routes
router.get('/', siteController.index);
router.post('/', siteController.create);
router.put('/', siteController.update);
router.delete('/handle', siteController.handelAction);

router.get('/api/students', siteController.getStudent)
// router.get('/detail/:id', siteController.detail)
//Subject routes


module.exports = router;