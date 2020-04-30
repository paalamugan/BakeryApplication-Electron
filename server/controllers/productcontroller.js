const db = require('../config/db.config.js');
const Product = db.product;

exports.findAll = async (req, res, next) => {  
    await Product.findAll().then(product=>{
        res.send(product); 
     
   });
};

exports.newProduct = async (req, res, next) => {	
	// Save to MySQL database
	await Product.create({  
	  name: req.body.name,
	  quantity: req.body.quantity,
	  price: req.body.price
	}).then(product => {		
		// Send created customer to client
		res.send(product);
	});
};
exports.getProduct = async (req, res) => {	
    await Product.findById(req.params.Id).then(product => {
		res.send(product);
	})
};

exports.updateProduct = async (req, res) => {
	const Id = req.params.Id;
	await Product.update( 
        { name: req.body.name, quantity: req.body.quantity, price: req.body.price }, 
					 { where: {id: Id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a product with id = " + Id);
				   });
};
exports.deleteProduct = async (req, res) => {
	const Id = req.params.Id;
	await Product.destroy({
	  where: { id: Id }
	}).then(() => {
	  res.status(200).send('deleted successfully a product with id = ' + Id);
	});
};
    