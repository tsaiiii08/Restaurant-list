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
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports=mongoose.model('Restaurant', restaurantSchema)