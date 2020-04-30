
module.exports = (sequelize, DataTypes) => {
	const Shop = sequelize.define('shop', {
        shopName: {
		type: DataTypes.STRING
	  },
	  shopCode: {
		type: DataTypes.STRING
	  }
	});
	

	return Shop;
}


