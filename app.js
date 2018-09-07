const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express ();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true }));

app.get('/users', function(request, response){
  fs.readFile('users.json', function(err,data){
    if(err){
      throw err;
    }
    let users = JSON.parse(data);
    response.render("users" , {users: users})
  });
});

app.get('/', function(request, response){
  fs.readFile('users.json', function(err,data){
    if(err){
      throw err;
    }
    let users = JSON.parse(data);
    response.render("home" , {users: users})
  });
});

app.get('/search', function(request,response){
  response.render('search')
});



app.post('/search', function(request,response){
  fs.readFile('users.json', function(err,data){
    if(err){
      throw err;
    }
    let users = JSON.parse(data);
    console.log(request.body);
    let name = request.body;
    response.render('result',{users: users, name: name})
  });
});

app.get('/form' , function(request,response){

    response.render('form');

});

app.post('/form', function(request,response){
  var newdata = request.body
  fs.readFile('users.json', function (err,data){
  if(err){
    throw err;
  }
  let newusers = JSON.parse(data);
  newusers.push(newdata);
  console.log(newusers);


  fs.writeFile('users.json', JSON.stringify(newusers),function(err,data){
    if (err){
      throw err;
    }
  })
  // console.log(newuser)


});
response.redirect("home")
});



app.listen(3000, ()=>{
  console.log("using port 3000")
});
