const express = require('express');
const app = express();
const port = 3000;
const io = require('socket.io')(8080);
const connection = require('./model');
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

app.use(express.json());

app.get('/', (req, res) => {
    UserModel.find((err, docs) => {
        if(!err) {
            res.send(docs);
        } else {
            res.send(err);
        }
    });
});

app.listen(port, () => {
    console.log(`litening on:${port}`)
})

app.post('/register', (req, res) => {
    console.log(req.body);
    res.send('register response');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    UserModel.find({ mail: req.body.mail }, (err, docs) => {
        if(!err) {
            if(docs.length == 0) {
                res.send('mailul este gresit');
            } else if(docs[0].pass == req.body.pass) {
                res.send('succes');
            } else {
                res.send('parola este gresita');
            }
        } else {
            console.error(err);
        }
    });
});

app.post('/forgotPass', (req, res) => {
    console.log(req.body);
    res.send('forgot pass response');
});

io.on('connection', socket => {

    socket.on('get-id', () => {
        console.log(socket.id);
        socket.emit('get-id',socket.id);
    });

    socket.on('message', (data) => {
        io.emit('message', data);
    });
});