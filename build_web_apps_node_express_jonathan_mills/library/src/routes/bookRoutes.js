const express = require('express');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb'); // "destructuring": same as const mongoClient = require('mongodb').MongoClient;
const bookRouter = express.Router();

function router(nav, mongoConfig) {
    var books = [];


    console.log(`Nav is '${nav.length}' long`);
    nav.forEach(navLink => {
        console.log(`Nav Link: ${navLink.link}:${navLink.title}`)
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