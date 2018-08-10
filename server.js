var express = require('express');

var app = express();
const PORT = process.env.PORT || 6000;

app.use(express.static('public'))

app.get('/hello', function (req, res) {
    console.log("request received")
   res.send("Hello World!"); 
});

app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}...`);
});

