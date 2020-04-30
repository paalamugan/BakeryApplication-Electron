
module.exports = (sequelize, DataTypes) => {
	const SalesOrder = sequelize.define('salesorder', {
        customerId: {
            type: DataTypes.INTEGER
          },
          advance: {
            type: DataTypes.INTEGER
          },
          total: {
            type: DataTypes.INTEGER
          },
          orderedDate: {
            type: DataTypes.DATEONLY,defaultValue: DataTypes.NOW
          },
          expectedDate: {
            type: DataTypes.STRING 
          },
          expectedtime: {
            type:  DataTypes.STRING
          },
          orderedTime: {
            type:  DataTypes.DATE,defaultValue: DataTypes.NOW
          },
          orderstatusId : {
            type: DataTypes.INTEGER
          },
          shopId: {
            type: DataTypes.INTEGER
          },
          orderitemId: {
            type: DataTypes.INTEGER
          },
        });
        SalesOrder.associate = function(models){
            SalesOrder.belongsTo(models.Shop,{foreignKey: 'shopId'});
            SalesOrder.belongsTo(models.OrderStatus,{foreignKey: 'orderstatusId'});
            SalesOrder.belongsTo(models.Customer,{foreignKey: 'customerId'});
            //SalesOrder.belongsTo(models.Shop)
        };

	return SalesOrder;
};


