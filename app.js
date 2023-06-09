const express = require('express')
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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)
app.use(express.static('public'))

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

