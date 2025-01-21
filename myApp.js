let express = require('express');
let app = express();

// console.log("Hello World")

// app.get("/", (req, res)=>{
//   res.send("Hello Express")
// })
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/json", (req,res)=>{
  res.json({"message":"Hello json" })
})

module.exports = app;
