const passport = require('passport');
const debug = require('debug')('app:local.strategy');
const { MongoClient } = require('mongodb');
const { Strategy } = require('passport-local');

const mongoConfig = require('../db/mongoConfig.js');

module.exports = function localStrategy() {
    // Pass in a JSON object telling it what the username and password fields are in the HTML
    // and an anonymous function it can call with the username, the password, and a callback function.
    // This function creates the user object.
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, doneCallback) => {
            // I'm adding the date stuff
            //var today = new Date();
            //var creationTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            (async function authenticateUser() {
                let client;
                try {
                    client = await MongoClient.connect(mongoConfig.url);
                    debug('Connected correctly to the MongoDB server');
                    const db = client.db(mongoConfig.database);
                    const collection = await db.collection('users');
                    const user = await collection.findOne({ username });
                    debug(user);

                    if (user.password === password) {
                        // Pass the found user to passport to add to the session cookie
                        // It will be part of the req from now on
                        debug(`User ${username} found`);
                        doneCallback(null, user);
                    } else {
                        // NOTE It didn't fail, it was just not found, so return falls instead of error
                        debug(`User ${username} not found`);
                        doneCallback(null, false);
                    }
                } catch (error) {
                    console.log(error.stack);
                }
                client.close();

            }());
        })
    );
}