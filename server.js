const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.use((req, res, next) => {
  var d =  new Date();
  var now = `${d}: ${req.method} ${req.url}`
  fs.appendFile('server.log',now +"\n", (err) => {

  });
  next();
});

// app.use((req, res ,next) => {
//   res.render('maintanance.hbs');
// });

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('year', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('scream', (item) => {
  return item.toUpperCase();
})
app.set('view engine', 'hbs')



app.get('/about', (req, res) => {
  res.render('about.hbs',{
    title: 'About Page!',
    about: 'Welcome to about page.'
    })
})

app.get('/home',(req,res) => {
  res.render('home.hbs',{
      title: 'Home page',
      home: 'Welcome to Home page',
      para: 'This is a pargraph in get(inside server), added via home.hbs '

  });
})


 app.use(express.static(__dirname + '/public'));
//
//
//
// app.get('/' ,(req,res) => {
//   res.send("<h1>Hello Express</h1>");
// });
//
//
// app.get("/error" , (req,res) => {
//   res.send({
//     error: "error message"
//   })
// })

app.listen(port, () => {
  console.log("Successful");
});
