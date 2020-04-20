// Pull in the dependencies
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const pug = require('pug');
const ejs = require('ejs');

// Constants
const port = process.env.PORT || 3000; 

// Globals
const app = express();

// Set up Morgan for access logging
app.use(morgan('combined'));

// Set up Express, serving js and css from the public/ folder.
app.use(express.static(path.join(__dirname, 'public')));

// Set up templating engine and template directory
app.set('views', './src/views');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

// Set up Express to find Bootstrap and Jquery from the node modules
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

// Route for / to index.html
/* app.get('/', function (req, res) {
  // res.send("Hello from my library app");
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
}); */
app.get('/', (req, res) => {
  // Static text
  //res.send("Hello from my library app");

  // Static files under the views directory
  //res.sendFile(path.join(__dirname, 'views', 'index.html'));

  // Rendering with pug, looking for src/views/index.pug
  res.render('index', {
    title: "David's Library",
    list: ['a','b']
  });
});

app.listen(port, () => {
  // Old school way
  // console.log('Listening on port ' + chalk.green('3000'););

  // With template strings, surrounded by backticks
  // console.log(`Listening on port ${chalk.green('3000')}.`);

  // debug mode, only shows up when you're debugging
  // To run with debugging:
  // DEBUG=* node app.js
  debug(`Listening on port ${chalk.green(port)} for requests.`);
});
