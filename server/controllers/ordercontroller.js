const db = require('../config/db.config.js');
const SalesOrder = db.salesorder;
const OrderStatus = db.orderstatus;

exports.findAll = async (req, res, next) => {  
    await SalesOrder.findAll().then(salesorder=>{
        res.send(salesorder); 
     
   });
};
exports.getstatus = async (req, res, next) => {  
        await OrderStatus.findAll().then(orderstatus =>{
            res.send(orderstatus); 
        });
   };
   exports.getSalesReport = async (req, res, next) => {

  const orderstatus = await OrderStatus.findOne({'name':'Delivered'});
  console.log(orderstatus);
    
};
exports.addSalesOrder = async (req,res,next) => {


}
