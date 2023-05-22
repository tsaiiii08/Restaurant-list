const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port =3000
const restaurantList = require('./restaurant.json') 

//express tamplate engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/',(req,res)=>{
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  console.log(req.params.id)
  const restaurant = restaurantList.results.find((restaurant)=>{
    return restaurant.id.toString() === req.params.id
  })
  res.render('show', { restaurant: restaurant })
})

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  const restaurants = restaurantList.results.filter(function (restaurant) {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants:restaurants, keyword: req.query.keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

//static files