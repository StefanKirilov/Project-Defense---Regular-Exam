const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors( {
    origin: 'http://localhost:4200',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
} ));

app.use(express.json());
app.use(cookieParser());


app.use(routes);

mongoose.connect('mongodb://localhost:27017/booking')
.then(() => console.log('DB connected'));

app.listen(3030, () => console.log('Server is listening on port 3030'));