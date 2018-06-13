var express = require('./node_modules/express');
var app = express();

var fileUpload = require('./node_modules/express-fileupload');
var flash = require('./node_modules/connect-flash');
var session = require('./node_modules/express-session');
var csv = require('./node_modules/fast-csv');

global.csvRead = csv;

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.use(fileUpload({
    limits: { fileSize: 2 * 1024 * 1024 }
  }));

app.use(flash());
app.use(session({ cookie: { maxAge: 60000 }, secret: 'woot',resave: false,saveUninitialized: false}));

var Knex = require('./node_modules/knex');
const { Model } = require('objection');

const knexConfig = require('./knexfile.js').development;
const knex = Knex(knexConfig);

Model.knex(knex); // Give the knex object to objection.

require('./routes/userroute.js')(app);

app.listen(8081);