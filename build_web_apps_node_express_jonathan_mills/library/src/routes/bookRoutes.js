const express = require('express');
const sql = require('mysql');
const bookRouter = express.Router();
var books = [];

function router(nav, sqlConnection) {

    console.log(`Nav is '${nav.length}' long`);
    for (let i = 0; i < nav.length; i++) {
        console.log(`nav[${i}]='${nav[i].link}:${nav[i].title}`)
    }

    console.log("Dynamic books");
    sqlConnection.connect((error, result) => {
        if (error) {
            console.log(`Error ${error} connecting to database`);
            return;
        }
        console.log("Connected to database!");

        sqlConnection.query('select id, title, author from books order by id', function (error, results, fields) {
            //if (error) throw error;
            console.log(`There are ${results.length} books`);
            for (var i = 0; i < results.length; i++) {
                var row = results[i];
                books[row.id] = {
                    title: row.title,
                    author: row.author
                };
            }
            console.log("Out of loop");
            console.log("books 1 V");
            console.log(books);
            console.log("books 1 ^"); 
            sqlConnection.end();
        });
    });
    console.log("Out of connect");
    sqlConnection.end((error) => {
        if (error) {
            console.log(`Error ${error} disconnecting to database`);
            return;
        }
        console.log("Disconnected from the database");
      
    }
    



    /* 
            console.log("Static books");
            books = [
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
        
     */

    console.log("books 2 V");
    console.log(books);
    console.log("books 2^");

    // Setting up routes
    bookRouter.route('/')
        .get((req, res) => {
            res.render('bookListView', {
                title: "David's Library",
                nav,
                books, // books is a shorthand for books: books (send the object books with a key of books)
            });
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            // const id = req.params.id;
            const { id } = req.params; // Pull the id property out of req.params
            console.log(`bookRoutes:${id}:${books[id]}`);
            res.render('bookView', {
                title: "David's Library",
                nav,
                book: books[id],
                id,
            }
            );

        });

    return bookRouter;
}

module.exports = router;