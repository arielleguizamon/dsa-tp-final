var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  shortid = require('shortid');
var uniqueValidator = require('mongoose-unique-validator');

var teamSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  nombre: {
    type: String,
    unique: true,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  organizacion: String,
  imagen: String,
  token: String,
  ip: String,
  aprobado: Boolean,
  capitan: {
    type: String,
    ref: 'User'
  },
  jugadores: [
    {
      type: String,
      ref: 'User'
    }
  ]
}, {timestamps: true});

teamSchema.plugin(uniqueValidator);
var Team = mongoose.model('Team', teamSchema);

module.exports = Team;
