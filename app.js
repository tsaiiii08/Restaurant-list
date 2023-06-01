const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'produciton') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('db is on error')
})
db.once('open', () => {
  console.log('db is connected')
})

const Restaurant = require('./models/restaurant')



//express tamplate engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log('error'))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => (res.render('show', { restaurant })))
    .catch(error => console.log('error'))
})


app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  Restaurant.find()
    .lean()
    .then(restaurants_all => restaurants_all.filter(function (restaurant) {
      const restaurants = restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
      return restaurants
    }))
    .then(restaurants => res.render('index', { restaurants: restaurants, keyword: req.query.keyword }))
    .catch(error => console.log('error'))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

//static files