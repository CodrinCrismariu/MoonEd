const express = require('express');
const app = express();
const port = 3000;
const io = require('socket.io')(8080);
const connection = require('./model');
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const ChatModel = mongoose.model('Chat');

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
    UserModel.findOne({ id: req.body.id }, (err, user) => {
        if (err) {
            console.error(err);
        }
        if (!user) {
            res.send('codul de autentificare este gresit');
        }
        else if(!user.mail) {
            user.mail = req.body.mail;
            user.pass = req.body.pass;
            user.save((err) => {
                if (err) {
                    console.error(err);
                }
                res.send('succes');
            });
        } else {
            res.send('codul este deja autentificat')
        }
    })
});

app.post('/login', (req, res) => {
    UserModel.findOne({ mail: req.body.mail }, (err, user) => {
        if(!err) {
            if(!user) {
                res.send('mailul este gresit');
            } else if(user.pass == req.body.pass) {
                res.send('succes');
            } else {
                res.send('parola este gresita');
            }
        } else {
            console.error(err);
        }
    });
});

app.post('/retrieveUserData', (req, res) => {
    UserModel.findOne({ mail: req.body.mail }, (err, user) => {
        if(!err) {
            if(user) {
                res.send({ name: user.name.split(' '), type: user.type, id: user.id })
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

const connectedSockets = new Map();
const reverseSockets = new Map();

io.on('connection', socket => {

    socket.emit('get id');
    socket.on('get id', id => {
        connectedSockets.set(id, socket.id);
        reverseSockets.set(socket.id, id);
    })

    socket.on("disconnect", () => {
        connectedSockets.delete(reverseSockets.get(socket.id));
        reverseSockets.delete(socket.id);
    });

    socket.on('message', data => {
        ChatModel.findOne({ id: data.chatId }, (err, chat) => {
            if(!err) {
                const users = chat.users;
                users.forEach(user => {
                    console.log(connectedSockets.get(user));
                    if(connectedSockets.get(user)) {
                        io.to(connectedSockets.get(user)).emit('message', { chatId: data.chatId, message: data.message });
                    }
                });
            } else {
                console.error(err);
            }
        });
    });
});