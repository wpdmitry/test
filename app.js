const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const routes = require('./routes');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(path.join(__dirname, "views/partials"));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "static")));
app.use(favicon(path.join(__dirname, 'static/img', 'favicon.ico')));

routes(app);

module.exports = app;
