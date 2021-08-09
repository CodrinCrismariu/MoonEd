const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    id: String,
    type: String,
    class: String,
    pass: String,
    mail: String,
    chats: Array,
    grades: Array,
});

mongoose.model('User', UserSchema)