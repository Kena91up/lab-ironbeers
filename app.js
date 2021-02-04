const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const port = process.env.PORT;
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')
//let beers = require('./data')

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
    .then(dataFromAPI => {
      const data = {
        beers: dataFromAPI
      };
      res.render('beers', data);
    })
    .catch(err => {
      console.log('error');
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(dataFromAPI => {
    const data = {
      randombeer: dataFromAPI
    };
    res.render('random-beer.hbs', data);
  })
  .catch(err => {
    console.log('error');
  });
});

app.get('/beers/:id', (req, res) => {
  punkAPI
  .getBeer(beerId)
  .then(dataFromAPI => {
    const data = {
      beer: dataFromAPI
    };
    res.render('beers.hbs', data);
  })
  .catch(err => {
    console.log('error');
  });
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
