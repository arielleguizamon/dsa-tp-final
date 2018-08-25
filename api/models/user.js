var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  shortid = require('shortid');

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nombre: String,
  apellido: String,
  email: String,
  equipo: {
    type: String,
    ref: 'Team'
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  registerToken: String,
  habilitado: Boolean,
  administrator: Boolean
}, {timestamps: true});

var User = mongoose.model('User', userSchema);

module.exports = User;
