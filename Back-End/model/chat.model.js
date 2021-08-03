const mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Required"
    },
    id: {
        type: String,
        required: "Required"
    },
    messages: {
        type: Array,
    },
    users: {
        type: Array,
    }
});

mongoose.model('Chat', ChatSchema)