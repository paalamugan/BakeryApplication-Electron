
module.exports = (sequelize, DataTypes) => {
	const Customer = sequelize.define('customer', {
        name: {
		type: DataTypes.STRING 
	  },
	  mobile: {
		type: DataTypes.STRING
      },
      alternateMobile: {
		type: DataTypes.STRING
	  }
	});
	

	return Customer;
}


