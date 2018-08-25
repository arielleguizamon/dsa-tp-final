const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  config = require('./config'),
  router = require('./routes'),
  middleware = require('./middleware'),
  db = require('./db'),
  cors = require('cors'),
  seeds = require('./seeds'),
  corsOptions = require('./cors')

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use('/api/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.listen(config.api.port, function() {
  console.log(config.api.name + ' app listening on port ' + config.api.port);
});

app.use('/', router);
