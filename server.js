// NOTE: Modules and templating engines
const express = require('express');
  const app = express();

const mustacheExpress = require('mustache-express');
  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', __dirname + '/views');

// NOTE: Middleware
const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

app.use('/public', express.static('public'));

// NOTE: Mongobongo
var url = 'mongodb://localhost:27017/snippets';

const mongoose = require('mongoose');
  mongoose.Promise = require('bluebird');
  mongoose.connect(url);

const MongoClient = require('mongodb').MongoClient, assert = require('assert');
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    console.log("Connected successfully to server");
    db.close();
  });


app.get('/', (req, res) => { res.render('index') });

// NOTE: Server listens to port 3000
app.listen(3000, () => {console.log('BIGBANG: Fantastic Baby')});
