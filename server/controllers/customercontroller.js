const db = require('../config/db.config.js');
const Customer = db.customer;

exports.findAll = async (req, res, next) => {  
    await Customer.findAll().then(customer=>{
        res.send(customer); 
     
   });
};

exports.newCustomer = async (req, res, next) => {	
	// Save to MySQL database
	await Customer.create({  
	  name: req.body.name,
	  mobile: req.body.mobile,
	  alternateMobile: req.body.alternateMobile
	}).then(customer => {		
		// Send created customer to client
		res.send(customer);
	});
};
exports.getCustomer = async (req, res) => {	
    await Customer.findById(req.params.Id).then(customer => {
		res.send(customer);
	})
};

exports.updateCustomer = async (req, res) => {
	const Id = req.params.Id;
	await Customer.update( 
        { name: req.body.name, mobile: req.body.mobile, alternateMobile: req.body.alternateMobile }, 
					 { where: {id: Id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a product with id = " + Id);
				   });
};
exports.deleteProduct = async (req, res) => {
	const Id = req.params.Id;
	await Customer.destroy({
	  where: { id: Id }
	}).then(() => {
	  res.status(200).send('deleted successfully a product with id = ' + Id);
	});
};
    