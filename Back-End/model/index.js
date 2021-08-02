const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MoonEd', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err) {
        console.log('Connected to DB');
    } else {
        console.error(err);
    }
})

const User = require('./user.model')