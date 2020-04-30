
module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define('product', {
        name: {
		type: DataTypes.STRING 
	  },
	  quantity: {
		type: DataTypes.INTEGER
      },
      price: {
		type: DataTypes.INTEGER
	  }
	});
	

	return Product;
}


