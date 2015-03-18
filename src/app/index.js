var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    compression = require('compression'),
    config = require('urlshortener/config');


app.enable('trust proxy');
app.disable('x-powered-by');

app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api/v1', require('urlshortener/routes/api'));
app.use('/', require('urlshortener/routes/home'));

app.listenBound = server.listen.bind(server, config.get('http:port'));

module.exports = app;
