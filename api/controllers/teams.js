"use strict";

const Team = require("../models/team.js");
const User = require("../models/user.js");
var slug = require("slug");
var _ = require("lodash");
var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");
var config = require("../config");

exports.list = (req, res) => {
  Team.find(req.query, req.fields, req.options)
    .populate(req.populate)
    .exec(function(err, results) {
      if (err) return res.status(400).json(err);
      else return res.json(results);
    });
};

exports.count = (req, res) => {
  Team.count(req.query).exec(function(err, results) {
    results = {
      count: results
    };
    if (err) return res.status(400).json(err);
    else return res.status(200).json(results);
  });
};

exports.create = async (req, res) => {
  if (req.body.nombre != undefined) {
    req.body.slug = slug(req.body.nombre);
  }
  req.body.capitan = req.user._id;
  var newEntity = Team(req.body);
  newEntity.save(async function(err) {
    if (err) {
      return res.status(400).json(err);
    } else {
      let user = await User.findById(req.user._id);
      user.equipo = newEntity._id;
      await user.save();
      return res.status(201).json(newEntity);
    }
  });
};

exports.get = (req, res) => {
  Team.findById(req.params.id, req.fields)
    .populate(req.populate)
    .exec(function(err, results) {
      if (err) return res.status(400).json(err);
      else return res.json(results);
    });
};

exports.update = (req, res) => {
  if (req.body.nombre != undefined) {
    req.body.slug = slug(req.body.nombre);
  }
  Team.findByIdAndUpdate(req.params.id, req.body, function(err, entity) {
    if (err) return res.status(400).json(err);
    else return res.json(entity);
  });
};

exports.delete = (req, res) => {
  Team.findByIdAndRemove(req.params.id, function(err, entity) {
    if (err) return res.status(400).json(err);
    else return res.json();
  });
};

exports.activateTeam = async (req, res) => {
  if (req.user.administrador != true) {
    return res
      .status(403)
      .json({ err: "No tenés permisos para realizar esta accion" });
  }
  let team = await Team.findById(req.params.id).populate("capitan jugadores");
  if (!team) {
    return res.status(404).json({ err: "team not found" });
  }
  let client = nodemailer.createTransport(sgTransport(config.mailOptions));

  let token = Math.random()
    .toString(36)
    .substring(7);
  let number = Math.floor(Math.random() * 100) + 1;
  team.aprobado = true;
  team.token = token;
  team.imagen = "https://loremflickr.com/320/240";
  team.ip = "10.10.10." + number;
  await team.save();

  let email = {
    from: "equipo-creado@tp-final-dsa.com",
    to: team.capitan.email,
    subject: "Equipo creado con éxito",
    text:
      "Su equipo fue creado y aprobado con éxito, para que usuarios se anoten al equipo debe brindarles el siguiente token: " +
      token
  };
  client.sendMail(email, function(err, info) {
    console.log("mail sent");
  });
  return res.status(200).json(team);
};

exports.associateUser = async (req, res) => {
  let team = await Team.findById(req.params.id).populate("capitan");
  if (!team) {
    return res.status(404).json({ err: "team not found" });
  }
  if (req.body.token != team.token) {
    return res
      .status(400)
      .json({ errors: { token: { message: "invalid token" } } });
  }
  team.jugadores.push(req.user._id);
  await team.save();
  return res.status(200).json(team);
};
