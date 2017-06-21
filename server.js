const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const passport = require('passport')
const app = express()

require('ejs')
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (request, response) => {
  database.getAlbums((error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      response.render('index', { albums: albums })
    }
  })
})

app.get('/signin', function(req, res) {
  res.render('signin');
});

app.get('/signup', function(req, res) {
  res.render('signup');
});

app.get('/profile', function(req, res) {
  res.render('profile');
});

app.get('/albums/:albumID', (request, response) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      const album = albums[0]
      response.render('album', { album: album })
    }
  })
})


app.use((request, response) => {
  response.status(404).render('not_found')
})


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
