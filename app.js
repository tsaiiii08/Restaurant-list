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
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))



//express tamplate engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))


//瀏覽所有餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log('error is on read all data'))
})

//新增餐廳頁面的路由設定
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//接收欲新增內容並送往資料庫的路由
app.post('/restaurants',(req,res)=>{
  const image = req.body.image
  const name = req.body.name
  const category = req.body.category
  const rating = req.body.rating
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const description = req.body.description
  return Restaurant.create({
    image: image,
    name: name,
    category: category,
    rating: rating,
    location: location,
    google_map:google_map,
    phone: phone,
    description: description,
  })
  .then(() => res.redirect('/')) 
  .catch(error => console.log('error is on add data'))
})

//瀏覽特定餐廳細節
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => (res.render('show', { restaurant })))
    .catch(error => console.log('error is on read specific data'))
})

//搜尋餐廳
app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  Restaurant.find()
    .lean()
    .then(restaurants_all => restaurants_all.filter(function (restaurant) {
      const restaurants = restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
      return restaurants
    }))
    .then(restaurants => res.render('index', { restaurants: restaurants, keyword: req.query.keyword }))
    .catch(error => console.log('error is on search'))
})



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

//static files