const mongoose = require('mongoose');
const variable = require('../variable');

mongoose.connect(variable.dbIp, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err) {
        console.log('Connected to DB');
    } else {
        console.error(err);
    }
})

const User = require('./user.model')
const Chat = require('./chat.model')