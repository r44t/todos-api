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

  if (matchedId) {
    res.json(matchedId);
  } else {
    res.status(404).json({"Error": "there no found ID"});
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

app.delete('/todos/:id', function(req, res) {
  var todosId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todosId});

  if (!matchedTodo) {
    res.status(404).json({"Error": "there no found ID"});
  } else {
    todos = _.without(todos, matchedTodo);
    res.json(matchedTodo);
  }
});

app.put('/todos/:id', function(req, res) {
  var todosId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todosId});
  var body = _.pick(req.body, 'description', 'completed');
  validAttribuite = {};

  if (!matchedTodo) {
    res.status(404).json({"Error": "there no found ID"});
  } 

  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
    validAttribuite.completed = body.completed;
  } else if (body.hasOwnProperty('completed')) {
    return res.status(400).send();
  }

  if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
    validAttribuite.description = body.description;
  } else if (body.hasOwnProperty('description')){
    return res.status.send();
  }

  _.extend(matchedTodo, validAttribuite);
  res.json(matchedTodo);
});

app.listen(PORT, function() {
  console.log('Express is Started in Port ' + PORT);
});