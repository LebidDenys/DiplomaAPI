const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const cors = require('cors');
const uuid = require('uuid/v4')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
mongoose.Promise = global.Promise;
const usersRouter = require('./routes/user');
const measurements = require('./routes/measurement');
const points = require('./routes/points');
const User = require('./models/user');
const bcrypt = require('bcrypt-nodejs');

const app = express();

mongoose.connect('mongodb://localhost:27017/diplomaDB')
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

app.use(session({
    genid: (req) => {
        return uuid() // use UUIDs for session IDs
    },
    secret: 's3cr3t',
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001'
}));

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        User.find({ email })
            .then(res => {
                const user = res[0]
                if (!user) {
                    return done(null, false, { message: 'Invalid credentials.\n' });
                }
                if (!bcrypt.compareSync(password, user.password)){
                    return done(null, false, { message: 'Invalid credentials.\n' });
                }
                return done(null, user);
            })
            .catch(error => done(error));
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.find({'_id': ObjectId(id)})
        .then(res => {
            done(null, res)} )
        .catch(error => done(error, false))
});



app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send(`You hit home page!\n`)
})
app.use('/user', usersRouter);
app.use('/measurements', measurements);
app.use('/points', points);

app.get('/authrequired', (req, res) => {
    if(req.isAuthenticated()) {
        res.send('you hit the authentication endpoint\n')
    } else {
        res.redirect('/')
    }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
