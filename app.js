const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

const sessionMiddleware = require('./utility/session').session;
const db = require('./data/database');
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(sessionMiddleware());

app.use(authRoutes);
app.use(chatRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });


