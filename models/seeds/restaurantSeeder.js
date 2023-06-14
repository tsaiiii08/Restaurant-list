const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

db.once('open', () => {
  console.log('running restaurantSeeder script')
  Restaurant.create(restaurantList)
  .then(()=> {
    console.log('restaurantSeeder has done')
    db.close()
    })
    .catch(error => console.log('error is on creat restaurantSeeder'))
})
