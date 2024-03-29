const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//瀏覽特定方法排列後的餐廳
router.get('/sort/:sortMethod', (req, res) => {
  const sortMethod = req.params.sortMethod
  let sortSequence = 'asc'
  const userId = req.user._id   // 變數設定
  if (sortMethod === 'nameAsc') {
    Restaurant.find({ userId })
      .lean()
      .sort({ name: sortSequence })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.log('error is on read all data'))
  }
  else if (sortMethod === 'nameDesc') {
    sortSequence = 'desc'
    Restaurant.find({ userId })
      .lean()
      .sort({ name: sortSequence })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.log('error is on read all data'))

  }
  else if (sortMethod === 'category') {
    Restaurant.find({ userId })
      .lean()
      .sort({ category: sortSequence })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.log('error is on read all data'))
  }
  else if (sortMethod === 'location') {
    Restaurant.find({ userId })
      .lean()
      .sort({ location: sortSequence })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.log('error is on read all data'))
  }
  else if (sortMethod === 'rating') {
    sortSequence = 'desc'
    Restaurant.find({ userId })
      .lean()
      .sort({ rating: sortSequence })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.log('error is on read all data'))
  }
})

//新增餐廳頁面的路由設定
router.get('/new', (req, res) => {
  res.render('new')
})

//接收欲新增內容並送往資料庫的路由
router.post('/', (req, res) => {
  const userId = req.user._id
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
    google_map: google_map,
    phone: phone,
    description: description,
    userId: userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log('error is on add data'))
})

//瀏覽特定餐廳細節
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log('error is on read specific data'))
})

//瀏覽編輯頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log('error is on read specific data for edit'))
})
//編輯餐廳內容
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const image = req.body.image
  const name = req.body.name
  const category = req.body.category
  const rating = req.body.rating
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const description = req.body.description
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.image = image
      restaurant.name = name
      restaurant.category = category
      restaurant.rating = rating
      restaurant.location = location
      restaurant.google_map = google_map
      restaurant.phone = phone
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log('error is on edit data'))
})

// 刪除餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log('error is on delete data'))
})

module.exports = router