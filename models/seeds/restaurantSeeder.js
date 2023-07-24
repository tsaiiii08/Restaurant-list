const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results
const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  restaurantNumber:[0,1,2]
},{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  restaurantNumber: [3, 4, 5]
}]

db.once('open', () => {
  return Promise.all(Array.from(
      { length: 2 },
      (_, i) =>
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
        .then(hash => User.create({
          name: SEED_USER[i].name,
          email: SEED_USER[i].email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from(
           { length: 3 },(_, j) =>
              Restaurant.create({
                name: restaurantList[SEED_USER[i].restaurantNumber[j]].name,
                category: restaurantList[SEED_USER[i].restaurantNumber[j]].category,
                image: restaurantList[SEED_USER[i].restaurantNumber[j]].image,
                location: restaurantList[SEED_USER[i].restaurantNumber[j]].location,
                phone: restaurantList[SEED_USER[i].restaurantNumber[j]].phone,
                google_map: restaurantList[SEED_USER[i].restaurantNumber[j]].google_map,
                rating: restaurantList[SEED_USER[i].restaurantNumber[j]].rating,
                description: restaurantList[SEED_USER[i].restaurantNumber[j]].description,
                userId
              })
          ))
        })
    ))
    .then(() => {
      console.log('done.')
      process.exit()
    })
})


    
