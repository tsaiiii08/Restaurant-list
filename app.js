const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const routes = require('./routes')
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

const app = express()

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

