const mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
    id: String,
    messages: Array,
    users: Array,
    type: String,
    imgUrl: String,
});

mongoose.model('Chat', ChatSchema)