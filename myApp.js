let express = require('express');
let app = express();
require('dotenv').config();
const bodyParser = require('body-parser');

// console.log("Hello World")

// app.get("/", (req, res)=>{
//   res.send("Hello Express")
// })

// Use body-parser to parse POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logger middleware
app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path} -  ${req.ip}`);

  next();
});

// Use a middleware
app.use('/public', express.static(__dirname + '/public'));

// Send a file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Send json response
app.get('/json', (req, res) => {
  const isUppercase = process.env.MESSAGE_STYLE === 'uppercase';
  const message = 'Hello json';
  res.json({ message: isUppercase ? message.toUpperCase() : message });
});

// Chaining a middleware to a route
app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();

    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// Working with route params
app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

// Get query parameter input from the client
// app.get('/name', (req, res) => {
//   res.json({ name: `${req.query.first} ${req.query.last}` });
// });

// Get data from POST requests and chaining methods for the same path/route
app
  .route('/name')
  .get((req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` });
  })
  .post((req, res) => {
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });

module.exports = app;
