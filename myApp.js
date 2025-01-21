let express = require('express');
let app = express();
require('dotenv').config();

// console.log("Hello World")

// app.get("/", (req, res)=>{
//   res.send("Hello Express")
// })
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
  const isUppercase = process.env.MESSAGE_STYLE === 'uppercase';
  const message = 'Hello json';
  res.json({ message: isUppercase ? message.toUpperCase() : message });
});

module.exports = app;
