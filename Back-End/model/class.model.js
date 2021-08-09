const mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
    id: String,
    users: Array,
    name: String,
});

mongoose.model('Class', ClassSchema)