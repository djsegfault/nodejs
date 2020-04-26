const express = require('express');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb'); // "destructuring": same as const mongoClient = require('mongodb').MongoClient;
const bookRouter = express.Router();

const mongoConfig = require('../config/db/mongoConfig.js');

function router(nav) {


    // Middleware to check for user object in body added by passport
    // Next will continue processing, or redirect to / if missing
    bookRouter.use((req, res, next) => {
        if (req.user) {
            debug("User object found by bookRoutes, OK");
            next();
        } else {
            debug("User object NOT found by bookRoutes, redirecting to /");
            res.redirect('/');
        }
    });

    // Setting up routes
    bookRouter.route('/')
        .get((req, res) => {
            debug("Loading books");
            (async function mongo() {
                let client;
                (async function mongo() {
                    let client;
                    try {
                        client = await MongoClient.connect(mongoConfig.url);
                        debug('Connected correctly to the MongoDB server');
                        const db = client.db(mongoConfig.database);
                        const collection = await db.collection('books');
                        const books = await collection.find().toArray();

                        res.render('bookListView', {
                            title: "David's Library",
                            nav,
                            books, // books is a shorthand for books: books (send the object books with a key of books)
                        });
                    } catch (error) {
                        console.log(error.stack);
                    }
                    client.close();

                }());

            }());
        });


    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params; // Pull the id property out of req.params
            console.log(`looking for  book ${id}`);

            (async function mongo() {
                let client;
                (async function mongo() {
                    let client;
                    try {
                        client = await MongoClient.connect(mongoConfig.url);
                        debug('Connected correctly to the MongoDB server');
                        const db = client.db(mongoConfig.database);
                        const collection = await db.collection('books');
                        const book = await collection.findOne({ _id: new ObjectID(id) });
                        debug(book);

                        res.render('bookView', {
                            title: "David's Library",
                            nav,
                            book
                        });
                    } catch (error) {
                        console.log(error.stack);
                    }
                    client.close();

                }());

            }());

        });

    return bookRouter;
}

module.exports = router;