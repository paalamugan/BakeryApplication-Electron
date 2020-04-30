
module.exports = (sequelize, DataTypes) => {
	const OrderStatus = sequelize.define('orderstatus', {
        name: {
		type: DataTypes.STRING
	  },
	  code: {
		type: DataTypes.STRING
	  }
	});
	

	return OrderStatus;
}


