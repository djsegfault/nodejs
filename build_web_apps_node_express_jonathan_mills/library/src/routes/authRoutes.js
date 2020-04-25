const express = require('express');
const debug = require('debug')('app:authRoutes');
const { MongoClient } = require('mongodb'); // "destructuring": same as const mongoClient = require('mongodb').MongoClient;

const authRouter = express.Router();

function router() {
    authRouter.route('/signUp')
        .post((req, res) => {
            console.log("signUp router");
            debug(req.body);

            // Create the user (log them in), redirect to their profile page
            // After this, req will have a user object
            req.login(req.body, () => {
                res.redirect('/auth/profile');
            });
            
        });
    
    authRouter.route('/profile')
        .get((req, res) => {
            // Dump the user that passport added to the request
            res.json(req.user);
        });
    
    return authRouter;

};

module.exports = router;
