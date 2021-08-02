const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Required"
    }, // user name
    id: {
        type: String,
        required: "Required"
    }, // unique user hash
    type: {
        type: String,
        required: "Required"
    }, // profesor, elev, parinte
    class: {
        type: String,
    }, // class code
    pass: {
        type: String,
    },
    mail: {
        type: String,
    },
});

mongoose.model('User', UserSchema)