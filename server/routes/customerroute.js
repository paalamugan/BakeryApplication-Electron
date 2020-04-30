//const express= require('express');
//const router= express.Router();
const router = require('express-promise-router')();
const CustomerController = require('../controllers/customercontroller');


router.route('/')
.get(CustomerController.findAll)
.post(CustomerController.newCustomer);

router.route('/:Id')
.get(CustomerController.getCustomer)
.put(CustomerController.updateCustomer);


module.exports = router;