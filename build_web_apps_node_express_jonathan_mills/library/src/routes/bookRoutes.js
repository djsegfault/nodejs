const express = require('express');
const bookRouter = express.Router();

function router(nav) {

    console.log(`Nav is '${nav.length}' long`);
    for (let i = 0; i < nav.length; i++) {
        console.log(`nav[${i}]='${nav[i].link}:${nav[i].title}`)
    }

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