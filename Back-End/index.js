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

app.post('/getChats', (req, res) => {
    UserModel.findOne({ id: req.body.id }, (err, user) => {
        if(!err) {
            if(user) {
                let checkedChats = 0;
                let chatObjects = [];
                user.chats.forEach(chatId => {
                    ChatModel.findOne({ id: chatId }, (err, chat) => {
                        if(!err) {
                            if(chat) {
                                if(chat.type = 'private') {
                                    chat.users.forEach(newUser => {
                                        if(newUser != user.id) {
                                            UserModel.findOne({ id: newUser }, (err, user) => {
                                                checkedChats++;
                                                chatObjects.push({ name: user.name.split(' '), messages: chat.messages, img: chat.imgUrl, id: chat.id });
                                                if(checkedChats == user.chats.length) {
                                                    res.send(chatObjects);
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    // group chats
                                    checkedChats++;
                                    chatObjects.push({ name: chat.type, messages: chat.messages, img: chat.imgUrl, id: chat.id });
                                    if(checkedChats == user.chats.length) {
                                        res.send(chatObjects);
                                    }
                                }
                            } else {
                                checkedChats++;
                                console.error("can't find chat with id", chat.id);
                                if(checkedChats == user.chats.length) {
                                    res.send(chatObjects);
                                }
                            }
                        } else {
                            checkedChats++;
                            console.error(err);
                            if(checkedChats == user.chats.length) {
                                res.send(chatObjects);
                            }
                        }
                    });
                })
            } else {
                console.error("can't find user with id", req.body.id);
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

const MultiMap = require('multimap');
const connectedSockets = new MultiMap();
const reverseSockets = new Map();

const append = (currentMessages, messages) => {
    if (!Array.isArray(messages)) {
      messages = [messages]
    }
    return true
      ? messages.concat(currentMessages)
      : currentMessages.concat(messages)
  }


io.on('connection', socket => {

    console.log('socket connected');

    socket.emit('get id');
    socket.on('get id', id => {
        connectedSockets.set(id, socket.id);
        reverseSockets.set(socket.id, id);
    })

    socket.on("disconnect", () => {

        console.log('socket disconnected');

        const id = reverseSockets.get(socket.id);

        connectedSockets.delete(id, socket.id);
        reverseSockets.delete(socket.id, id);
    });

    socket.on('message', data => {
        ChatModel.findOne({ id: data.chatId }, (err, chat) => {
            if(!err) {
                if(chat){
                    const users = chat.users;
                    users.forEach(user => {
                        if(connectedSockets.get(user)) {
                            io.to(connectedSockets.get(user)).emit('message', { chatId: data.chatId, message: data.message });
                            console.log('message emited');
                        }
                    });
                    chat.messages = append(chat.messages, data.message);
                    chat.save();
                } else {
                    console.log("can't find chat with id", data.chatId);
                }
            } else {
                console.error(err);
            }
        });
    });
});