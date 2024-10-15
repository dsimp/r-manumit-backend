const express = require('express');
const { plantTree } = require('../controllers/gameController');
const router = express.Router();

router.post('/plant-tree', plantTree);

module.exports = router;