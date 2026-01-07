const express = require('express');
const router = express.Router();
const sudoController = require('../controllers/sudoController');

router.post('/verify-sudo', sudoController.verify);

module.exports = router;
