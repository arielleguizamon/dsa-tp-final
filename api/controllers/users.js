'use strict';

const User = require('../models/user.js');
var slug = require('slug');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var config = require('../config')
var bcrypt = require('bcrypt');

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
  var hash = bcrypt.hashSync(req.body.password, salt);

  req.body.registerToken = Math.random().toString(36).substring(7);

  req.body.password = hash;
  req.body.habilitado = false;
  var newEntity = User(req.body);
  newEntity.save(function(err) {
    if (err) {
      return res.status(400).json(err)
    } else {
      this.sendRegisterMail(newEntity)
      return res.status(201).json(newEntity)
    }
  }.bind(this));
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

exports.activateUser = async (req, res) => {
  let user = await User.findById(req.params.id)
  console.log(user);
  if (req.params.token == user.registerToken) {
    user.habilitado = true
    await user.save()
    return res.status(200).json(user)
  } else {
    return res.status(401)
  }
}

exports.sendRegisterMail = (user) => {
  let client = nodemailer.createTransport(sgTransport(config.mailOptions));

  let link = 'http://' + config.api.host + '/api/usuario/' + user._id + '/activar/' + user.registerToken

  let email = {
    from: 'alta-usuario@tp-final-dsa.com',
    to: user.email,
    subject: 'Registro de usuario',
    text: 'Para terminar el registro del usuario ingrese a este link: ' + link
  };
  client.sendMail(email, function(err, info) {
    console.log('mail sent');
  });
}
