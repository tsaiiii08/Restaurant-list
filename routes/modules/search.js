const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//搜尋餐廳
router.get('/', (req, res) => {
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

module.exports = router