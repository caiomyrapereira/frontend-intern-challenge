const bodyParser = require('body-parser');
const express = require('express');
const port = 8080;
const app = express();

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('\teste', function(req, res) {
    res.send('ok')
})
app.listen(port, function() {
    console.log('Executando...')
})