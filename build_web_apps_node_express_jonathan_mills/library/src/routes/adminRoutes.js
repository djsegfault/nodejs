const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb'); // "destructuring": same as const mongoClient = require('mongodb').MongoClient;

const adminRouter = express.Router();

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

function router(nav, mongoConfig) {
    adminRouter.route('/')
        .get((req, res) => {
            debug("Inserting books");
            (async function insertBooks() {
                let client;
                try {
                    const mongoConfig = require('../config/db/mongoConfig.js');
                    client = await MongoClient.connect(mongoConfig.url);
                    debug('Connected correctly to the MongoDB server');
                    const db = client.db(mongoConfig.database);
                    db.collection('books').deleteMany
                    const response = await db.collection('books').insertMany(books);

                    res.json(response);
                } catch (error) {
                    console.log(error.stack);
                }
                client.close();

            }());

        });

    return adminRouter;
}

module.exports = router;