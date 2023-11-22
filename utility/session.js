const expressSession = require('express-session');
const mongoDBStore = require('connect-mongo');

function session(){
   return expressSession({
        secret: 'varshit@06',
        resave: false,
        saveUninitialized: true,
        store: mongoDBStore.create({
          mongoUrl: 'mongodb://127.0.0.1:27017/sessions',
          ttl: 60 * 60 * 24, // 1 day in seconds
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
}

module.exports = {
    session: session
}