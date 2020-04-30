const Sequelize = require('sequelize');
const env = require('./env.js');
const db = {};


const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//Models/tables
db.shops = require('../models/shop.js')(sequelize, Sequelize);
db.orderstatus = require('../models/orderstatus.js')(sequelize, Sequelize);
db.product = require('../models/product.js')(sequelize, Sequelize);
db.customer = require('../models/customer.js')(sequelize, Sequelize);
db.salesorder = require('../models/salesorder.js')(sequelize, Sequelize);

module.exports = db;
