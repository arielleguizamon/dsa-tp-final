'use strict';

const Team = require('../models/team.js');
var slug = require('slug');
var _ = require('lodash');

exports.list = (req, res) => {
  Team.find(req.query, req.fields, req.options).populate(req.populate).exec(function(err, results) {
    if (err)
      return res.status(400).json(err)
    else
      return res.json(results)
  });
}

exports.count = (req, res) => {
  Team.count(req.query).exec(function(err, results) {
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
  if (req.body.name != undefined) {
    req.body.slug = slug(req.body.name)
  }
  var newEntity = Team(req.body);
  newEntity.save(function(err) {
    if (err) {
      return res.status(400).json(err)
    } else {
      return res.status(201).json(newEntity)
    }
  });
}

exports.get = (req, res) => {
  Team.findById(req.params.id, req.fields).populate(req.populate).exec(function(err, results) {
    if (err)
      return res.status(400).json(err)
    else
      return res.json(results)
  });
}

exports.update = (req, res) => {
  if (req.body.name != undefined) {
    req.body.slug = slug(req.body.name)
  }
  Team.findByIdAndUpdate(req.params.id, req.body, function(err, entity) {
    if (err)
      return res.status(400).json(err)
    else
      return res.json(entity)
  });
}

exports.delete = (req, res) => {
  Team.findByIdAndRemove(req.params.id, function(err, entity) {
    if (err)
      return res.status(400).json(err)
    else
      return res.json()
  })
}

exports.activateTeam = async (req, res) => {
  if (req.user.administrator != true)
    return res.status(403).json({err: 'forbidden'})

  let team = await Team.findById(req.params.id)
  team.aprobado = true
  team.save()
  return res.status(200).json(team)
}
