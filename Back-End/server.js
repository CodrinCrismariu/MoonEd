let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = 3000;

app.use(express.json());
app.listen(port, () => {
    console.log(`litening on:${port}`)
})

app.post('/register', (req, res) => {
    console.log(req.body);
    res.send('testing response');
});