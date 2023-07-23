const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const port = 3000
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()
require('./config/mongoose')

//express tamplate engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)


// start and listen on the Express server
app.listen(port, () => {
  console.log(`app is running on localhost:${port}`)
})

