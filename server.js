var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/todos', function (req, res) {
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

app.post('/todos', function(req, res) {
  var body = req.body;
 
  body.id = todoNextId++;
  todos.push(body);
  res.json(body);
});

app.listen(PORT, function() {
  console.log('Express is Started in Port ' + PORT);
});