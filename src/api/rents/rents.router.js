const express = require('express');
const { errors } = require('../../config');
const verifyResourceAccess = require('../../middleware/validation.js');
const rentsHandler = require('../rents/rents.handler.js');

const router = express.Router();

router.post('/', verifyResourceAccess(), rentsHandler.addRent);
router.get('/', verifyResourceAccess(), rentsHandler.getRents);

module.exports = { router };