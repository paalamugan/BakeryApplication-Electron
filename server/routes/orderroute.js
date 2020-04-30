//const express= require('express');
//const router= express.Router();
const router = require('express-promise-router')();
const OrderController = require('../controllers/ordercontroller');


router.route('/')
.get(OrderController.findAll)
.post(OrderController.addSalesOrder);

router.route('/getStatuses/')
.get(OrderController.getstatus)

router.route('/getSalesReport')
.get(OrderController.getSalesReport)


module.exports = router;