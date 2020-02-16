// import module from express and set port
const express = require('express')
const app = express()
const port = 3000

// import module from express-handlebars
const exphbs = require('express-handlebars')

// import restaurant list
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting route
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

// start server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
