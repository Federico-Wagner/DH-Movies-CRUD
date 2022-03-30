const express = require('express');
const router = express.Router();
const actorsControllers = require('../controllers/actorsControllers');

router.get('/actors', actorsControllers.list);


module.exports = router;