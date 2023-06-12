const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//瀏覽特定方法排列後的所有餐廳
router.get('/sort/:sortMethod', (req, res) => {
  const sortMethod = req.params.sortMethod
  let sortSequence = 'asc'
  if (sortMethod === 'nameAsc') {
    Restaurant.find()
      .lean()
      .sort({ name: sortSequence })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.log('error is on read all data'))
  }
  else if (sortMethod === 'nameDesc') {
    sortSequence = 'desc'
    Restaurant.find()
      .lean()
      .sort({ name: sortSequence })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.log('error is on read all data'))

  }
  else if (sortMethod === 'category') {
    Restaurant.find()
      .lean()
      .sort({ category: sortSequence })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.log('error is on read all data'))
  }
  else if (sortMethod === 'location') {
    Restaurant.find()
      .lean()
      .sort({ location: sortSequence })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.log('error is on read all data'))
  }
  else if (sortMethod === 'rating') {
    sortSequence = 'desc'
    Restaurant.find()
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
  console.log(req)
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
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log('error is on add data'))
})

//瀏覽特定餐廳細節
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log('error is on read specific data'))
})

//瀏覽編輯頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log('error is on read specific data for edit'))
})
//編輯餐廳內容
router.put('/:id', (req, res) => {
  const id = req.params.id
  const image = req.body.image
  const name = req.body.name
  const category = req.body.category
  const rating = req.body.rating
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const description = req.body.description
  return Restaurant.findById(id)
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
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log('error is on edit data'))
})

// 刪除餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log('error is on delete data'))

})

module.exports = router