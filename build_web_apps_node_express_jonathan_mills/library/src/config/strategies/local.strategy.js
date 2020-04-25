const passport = require('passport');
const { Strategy } = require('passport-local');

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
            const user = {
                username, password
            }

            doneCallback(null, user);
        })
    );
}