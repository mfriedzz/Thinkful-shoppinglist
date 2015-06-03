var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.remove = function(id) {
    var item = {};
    // Loop through all item and delete the selected one
    for(var i = 0; i < this.items.length; i++){      
      if(this.items[i].id == id) {
        item = this.items.splice(i, 1);
      }
    }
    
    return item;
};

Storage.prototype.update = function(id, name) {
    console.log("Got here");
    var item = {};
    // Loop through all item and delete the selected one
    for(var i = 0; i < this.items.length; i++){      
      if(this.items[i].id == id) {
        this.items[i].name = name;
        item = this.items[i];
      }
    }
    console.log("item",item);
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));
// app.use(express.logger('dev'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});


app.delete('/items/:id', function (request, response) {
    try {
      var item = storage.remove(request.params.id);
      response.status(201).json(item);
      //console.log("id", request.params.id);
      
        //response.send(200);
    } catch (exeception) {
      response.send(status, errorHandler);
       // response.send(404);
    }
});

app.put('/items/:id', jsonParser, function (request, response) {
    try {
       console.log("id & Body", request.params.id, request.body.name);
      var item = storage.update(request.params.id, request.body.name);
      response.status(201).json(item);
     
      
        //response.send(200);
    } catch (exeception) {
      response.send(status, errorHandler);
       // response.send(404);
    }
});
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
  next(err);
}

app.use(errorHandler);

//app.listen(process.env.PORT || 8080);
var server = app.listen(process.env.PORT || 8080, function() {
  console.log('Express server listening on port ' + server.address().port);
});

exports.app = app;
exports.storage = storage;