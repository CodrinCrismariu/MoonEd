const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

app.post('/register', (req, res) => {
    console.log(req.body);
    res.send('register response');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send('succes');
});

app.post('/forgotPass', (req, res) => {
    console.log(req.body);
    res.send('forgot pass response');
});

io.on("connection", socket => {
    console.log("a connection");
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
    })
});

server.listen(port, () => console.log("server running on port : " + port));

