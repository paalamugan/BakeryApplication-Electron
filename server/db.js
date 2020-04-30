const { sequelize, ...db } = require('./config/db.config');

const Shop = db.shops;
const Orderstatus = db.orderstatus;
const Product = db.product;

sequelize.sync().then(() => {
  Shop
    .findAndCountAll({})
    .then(result => {
      //console.log(result.count);
      if (result.count == 0) {

        Shop.bulkCreate([{
            "shopName": 'Madhura',
            "shopCode": 'Madhura'
          },
          {
            "shopName": "Cauvery",
            "shopCode": "Cauvery"
          },
          {
            "shopName": "Yamunai",
            "shopCode": "Yamunai"
          },

        ])


      }
    })

});

sequelize.sync().then(() => {
  Orderstatus
    .findAndCountAll({})
    .then(result => {
      //console.log(result.count);
      if (result.count == 0) {

        Orderstatus.bulkCreate([{
            "name": "Delivered",
            "code": "D"
          },
          {
            "name": "InProduction",
            "code": "IP"
          },
          {
            "name": "InStock",
            "code": "IS"
          },
          {
            "name": "Pending",
            "code": "P"
          }


        ])
      }
    })

});

sequelize.sync().then(() => {
  Product
    .findAndCountAll({})
    .then(result => {
      //console.log(result.count);
      if (result.count == 0) {

        Product.bulkCreate([{
            "name": "CupCake",
            "quantity": 2,
            "price": 20
          },
          {
            "name": "Bread",
            "quantity": 1,
            "price": 30
          }

        ])
      }
    })

});


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/bakery', {
//     promiseLibrary: require('bluebird')
//   })
//   .then((db) => {

//     console.log('MongoDB connection succeeded...');

//     db.collection('products').count((err, count) => {

//       if (err) throw err;

//       if (count === 0) {

//         db.collection('products').insertMany([{
//             "name": "CupCake",
//             "quantity": 2,
//             "price": 20
//           },
//           {
//             "name": "Bread",
//             "quantity": 1,
//             "price": 30
//           }


//         ], (err, res) => {

//           if (err) throw err;

//           console.log("Number of documents inserted: " + res.insertedCount);

//         });

//       }
//     });

//     db.collection('orderstatuses').count((err, count) => {

//       if (err) throw err;

//       if (count === 0) {
  
//         db.collection('orderstatuses').insertMany([{
//             "name": "Delivered",
//             "code": "D"
//           },
//           {
//             "name": "InProduction",
//             "code": "IP"
//           },
//           {
//             "name": "InStock",
//             "code": "IS"
//           },
//           {
//             "name": "Pending",
//             "code": "P"
//           }



//         ], (err, res) => {
//           if (err) throw err;
//           console.log("Number of documents inserted: " + res.insertedCount);
//         });

//       }
//     });

//     db.collection('shops').count((err, count) => {

//       if (err) throw err;

//       if (count === 0) {
      
//         db.collection('shops').insertMany([{
//             "shopName": "Madhura",
//             "shopCode": "Madhura"
//           },
//           {
//             "shopName": "Cauvery",
//             "shopCode": "Cauvery"
//           },
//           {
//             "shopName": "Yamunai",
//             "shopCode": "Yamunai"
//           }


//         ], (err, res) => {
//           if (err) throw err;
//           console.log("Number of documents inserted: " + res.insertedCount);
//         });

//       }
//     });

//   })
//   .catch((err) => console.error('Error in DB connection : ' + JSON.stringify(err, undefined, 2)));
