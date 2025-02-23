const express = require('express');
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const methodOverride = require('method-override')
const path = require('path');

const db = require('./config/db')
const route = require('./routes');
// db Connect
db.connect();

const app = express();

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

Handlebars.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
});
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
    // Routes init
route(app);


app.listen(3000)