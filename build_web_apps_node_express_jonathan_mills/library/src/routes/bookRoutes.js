const express = require('express');
const sql = require('mysql');
const bookRouter = express.Router();

function router(nav, sqlConfig) {
    var books = [];


    console.log(`Nav is '${nav.length}' long`);
    for (let i = 0; i < nav.length; i++) {
        console.log(`nav[${i}]='${nav[i].link}:${nav[i].title}`)
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

    // Setting up routes
    bookRouter.route('/')
        .get((req, res) => {
            const sqlConnection = sql.createConnection(sqlConfig);
            sqlConnection.query('select id, title, author from books order by id', (error, results, fields) => {
                if (error) {
                    return console.error(`Error ${error} querying database`);
                }
                console.log(`There are ${results.length} books`);
                for (var i = 0; i < results.length; i++) {
                    var row = results[i];
                    books[row.id] = {
                        title: row.title,
                        author: row.author
                    };
                }
                // console.log(books);

                sqlConnection.end((error) => {
                    if (error) {
                        return console.error(`Error ${error} disconnecting to database`);
                    }
                    console.log("Disconnected from the database");

                });

                res.render('bookListView', {
                    title: "David's Library",
                    nav,
                    books, // books is a shorthand for books: books (send the object books with a key of books)
                });
            });

        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params; // Pull the id property out of req.params
            var book = {};

            const sqlConnection = sql.createConnection(sqlConfig);
            sqlConnection.query('select id, title, author from books where id=' + sql.escape(id), (error, results, fields) => {
                if (error) {
                    return console.error(`Error ${error} querying database`);
                }

                if (results.length < 1) {
                    console.error(`book ${id} not found`);
                    // Handle this better
                    return;
                }

                book = {
                    id: results[0].id,
                    title: results[0].title,
                    author: results[0].author
                };

                sqlConnection.end((error) => {
                    if (error) {
                        return console.error(`Error ${error} disconnecting to database`);
                    }
                    console.log("Disconnected from the database")
                });

                res.render('bookView', {
                    title: "David's Library",
                    nav,
                    book
                });
            });


        });

    return bookRouter;
}

module.exports = router;