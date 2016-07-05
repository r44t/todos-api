var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
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
  var matchedId = _.findWhere(todos, {id: todosId});
  // todos.forEach(function(todo) {
  //   if (todosId === todo.id) {
  //     matchedId = todo;
  //   }
  // });
  if (matchedId) {
    res.json(matchedId);
  } else {
    res.status(404).send();
  }
})

app.post('/todos', function(req, res) {
  var body = _.pick(req.body, 'description', 'completed');
  
  if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
    res.status(400).send()
  } 
  body.description = body.description.trim();
  body.id = todoNextId++;
  todos.push(body);
  res.json(body);
  

});

app.listen(PORT, function() {
  console.log('Express is Started in Port ' + PORT);
});