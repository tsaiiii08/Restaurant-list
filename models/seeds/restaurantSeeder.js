const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('C:/Users/User/Desktop/project/Restaurant_List/restaurant.json')
if (process.env.NODE_ENV !== 'produciton') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('db is on error')
})
db.once('open', () => {
  restaurantList.results.forEach(restaurant => {
    Restaurant.create({
      image: `${restaurant.image}`,
      name: `${restaurant.name}`,
      category: `${restaurant.category}`,
      rating: `${restaurant.rating}`,
      location: `${restaurant.location}`,
      google_map: `${restaurant.google_map}`,
      phone: `${restaurant.phone}`,
      description: `${restaurant.description}`,
    })
  })
  console.log('db is connected')
})
