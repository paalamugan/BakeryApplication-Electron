//const express= require('express');
//const router= express.Router();
const router = require('express-promise-router')();
const ProductController = require('../controllers/productcontroller');


router.route('/')
.get(ProductController.findAll)
.post(ProductController.newProduct);
router.route('/:Id')
.put(ProductController.updateProduct)
.get(ProductController.getProduct)
.delete(ProductController.deleteProduct);
module.exports = router;