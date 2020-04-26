const passport = require('passport');
require('./strategies/local.strategy')();

// Note we're doing this one by creating the function and exporting it 
// instead of doing two separate lines like the routes just because
// the done callback will add the user object to the session

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    // Store user in session
    passport.serializeUser((user, done) => {
        // We're storing the whole user object, you would normally just store an identifier
        done(null, user);
    });

    // Retrieves user from session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

}