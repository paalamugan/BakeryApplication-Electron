//const express= require('express');
//const router= express.Router();
const router = require('express-promise-router')();
const ShopController = require('../controllers/shopcontroller.js');


router.route('/')
.get(ShopController.findAll);
module.exports = router;