const express = require('express');
const passport = require('passport');
const debug = require('debug')('app:authRoutes');
const { MongoClient } = require('mongodb'); // "destructuring": same as const mongoClient = require('mongodb').MongoClient;

const authRouter = express.Router();

const mongoConfig = require('../config/db/mongoConfig.js');

function router(nav) {
    authRouter.route('/signUp')
        .post((req, res) => {
            const { username, password } = req.body;
            const userToAdd = { username, password };

            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(mongoConfig.url);
                    debug('Connected correctly to the MongoDB server');
                    const db = client.db(mongoConfig.database);
                    // results will be a huge structure.  the operations (the added record) will be
                    // the one and only element of the ops array, which is an object with the username,
                    // the password, and the _id
                    const results = await db.collection('users').insertOne(userToAdd);
                    debug(results);

                    // Create the user (log them in), redirect to their profile page
                    // After this, req will have a user object
                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    });

                } catch (error) {
                    console.log(error.stack);
                }
                client.close();

            }());


            
        });
    
    authRouter.route('/signIn')
        .get((req, res) => {
            res.render('signInView', {
                nav,
                title: 'Sign in'
            });
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));
    
    authRouter.route('/profile')
        .get((req, res) => {
            // Dump the user that passport added to the request
            res.json(req.user);
        });
    
    return authRouter;

};

module.exports = router;
