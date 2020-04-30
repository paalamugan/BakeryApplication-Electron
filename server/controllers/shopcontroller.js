const db = require('../config/db.config.js');
const Shop = db.shops;
 

exports.findAll = async (req, res, next) => {  
         await Shop.findAll().then(shops=>{
             res.send(shops); 
          
        });
    }


