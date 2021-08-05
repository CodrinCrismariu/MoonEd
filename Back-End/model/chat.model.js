const mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
    id: {
        type: String,
        required: "Required"
    },
    messages: {
        type: Array,
    },
    users: {
        type: Array,
    },
    type: {
        type: String,
    },
    imgUrl: {
        type: String,
    }
});

mongoose.model('Chat', ChatSchema)