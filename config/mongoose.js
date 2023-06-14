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

module.exports = db
