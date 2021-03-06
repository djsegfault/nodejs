// Pull in the dependencies
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Globals
const port = process.env.PORT || 3000;
const app = express();
const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];
const sqlConfig = {
  host: 'localhost',
  user: 'nodejs',
  password: 'nodejs',
  database: 'PSLibrary'
};

// Router globals
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

// Set up Morgan for access logging
app.use(morgan('tiny'));

// Set up body parser for POST.  This will copy the POST into the body as JSON
// bodyParser.json() is middleware which is why we call it like a function. it will call next().
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up sessions and cookie parser for authentication
app.use(cookieParser());
app.use(session({ secret: 'secretForHashingCookiesCanBeAnything' }));
require('./src/config/passportConfig.js')(app);

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

// Set up routes
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

// Route for / to index.html
/* app.get('/', function (req, res) {
  // res.send("Hello from my library app");
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
  // Static text
  //res.send("Hello from my library app");

  // Static files under the views directory
  //res.sendFile(path.join(__dirname, 'views', 'index.html'));

  // Rendering with pug, looking for src/views/index.pug
}); */
app.get('/', (req, res) => {
  res.render('index', {
    title: "David's Library",
    nav,
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
