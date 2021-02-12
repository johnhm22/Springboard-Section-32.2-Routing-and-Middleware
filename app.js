const express = require('express');
const app = express();
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const items = require('./fakeDb');
const itemsRoutes = require('./routes/itemsRoutes');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use("/item", itemsRoutes);

// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = app;
