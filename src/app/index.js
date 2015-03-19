var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    compression = require('compression'),
    config = require('urlshortener/config'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    redis = require('redis').createClient(),
    redisStore = new RedisStore({
        host: config.get('redis:host'),
        port: config.get('redis:port'),
        client: redis
    }),
    Account = require('urlshortener/components/account/model'),
    APIError = require('urlshortener/lib/error');

/**
 * Initialize local strategy for logging in.
 */
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        Account.findOne({ email: email }, function(err, user) {
            if (err) return done(err);
            if (user && user.checkPassword(password)) return done(null, user);

            return done(new APIError('user not found', 404), false);
        });
    }
));

/**
 * Necessary for PassportJS to work.
 */
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

/**
 * Necessary for PassportJS to work.
 */
passport.deserializeUser(function(id, done) {
    Account.findById(id, done);
});

app.enable('trust proxy');
app.disable('x-powered-by');

app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(session({
    secret: config.get('session-secret'),
    proxy: true,
    cookie: {
        maxAge: 365 * 24 * 60 * 60
    },
    resave: true,
    saveUninitialized: true,
    store: redisStore
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routing.
 */
app.use('/api/v1', require('urlshortener/routes/api'));
app.use('/', require('urlshortener/routes/home'));

app.listenBound = server.listen.bind(server, config.get('http:port'));

module.exports = app;
