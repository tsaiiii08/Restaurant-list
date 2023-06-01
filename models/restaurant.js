const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  image:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
})

module.exports=mongoose.model('Restaurant', restaurantSchema)