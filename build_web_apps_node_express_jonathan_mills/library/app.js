// Pull in the dependencies
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

// Globals
const port = process.env.PORT || 3000;
const app = express();
const bookRouter = express.Router();

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  }];


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


// Setting up routes
bookRouter.route('/')
  .get((req, res) => {
    res.render('books', {
      title: "David's Library",
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' },
      ],
      books, // books is a shorthand for books: books (send the object books with a key of books)
    });
  });
app.use('/books', bookRouter);

bookRouter.route('/single')
  .get((req, res) => {
    res.send('Hello single book');
  });
app.use('/books', bookRouter);

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
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' },
    ],
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
