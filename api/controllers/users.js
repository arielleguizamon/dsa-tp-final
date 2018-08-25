'use strict';

const User = require('../models/user.js');
var slug = require('slug');
var _ = require('lodash');

exports.list = (req, res) => {
  User.find(req.query, req.fields, req.options).populate(req.populate).exec(function(err, results) {
    if (err)
      return res.status(400).json(err)
    else
      return res.json(results)
  });
}

exports.count = (req, res) => {
  User.count(req.query).exec(function(err, results) {
    results = {
      count: results
    }
    if (err)
      return res.status(400).json(err);
    else
      return res.status(200).json(results)
  });
}

exports.create = (req, res) => {
  var salt = bcrypt.genSaltSync(4);
  var hash = bcrypt.hashSync(req.body.paswword, salt);
  req.body.password = hash;
  var newEntity = User(req.body);
  newEntity.save(function(err) {
    if (err) {
      return res.status(400).json(err)
    } else {
      return res.status(201).json(newEntity)
    }
  });
}

exports.get = (req, res) => {
  User.findById(req.params.id, req.fields).populate(req.populate).exec(function(err, results) {
    if (err)
      return res.status(400).json(err)
    else
      return res.json(results)
  });
}

exports.update = (req, res) => {
  if (req.body.password != undefined) {
    var salt = bcrypt.genSaltSync(4);
    var hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
  }
  User.findByIdAndUpdate(req.params.id, req.body, function(err, entity) {
    if (err)
      return res.status(400).json(err)
    else
      return res.json(entity)
  });
}

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id, function(err, entity) {
    if (err)
      return res.status(400).json(err)
    else
      return res.json()
  })
}
