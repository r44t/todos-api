var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
  id: 1,
  descrip: 'meet mom to lunch',
  completed: false
},
{
  id: 2,
  descrip: 'go to market',
  completed: false,
},
{
  id: 3,
  descrip: 'feed the dog',
  completed: true
}
];

app.get('/', function(req,res) {
  res.send('Todos API Root');
})

app.get('/todos', function(req, res) {
  res.json(todos);
})

app.get('/todos/:id', function(req, res) {
  var todosId = parseInt(req.params.id, 10);
  var matchedId;
  todos.forEach(function(todo) {
    if (todosId === todo.id) {
      matchedId = todo;
    }
  });
  if (matchedId) {
    res.json(matchedId);
  } else {
    res.status(404).send();
  }
})


app.listen(PORT, function() {
  console.log('Express is Started in Port ' + PORT);
})