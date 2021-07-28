const express = require("express");
const app = express();
const port = 3000;
const io = require("socket.io")(8080);

app.use(express.json());
app.listen(port, () => {
    console.log(`litening on:${port}`)
})

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

    socket.on("get-id", () => {
        console.log(socket.id);
        socket.emit("get-id",socket.id);
    });

    socket.on("message", (data) => {
        io.emit('message', data);
    });
});