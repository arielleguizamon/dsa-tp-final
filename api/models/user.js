var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  shortid = require('shortid');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
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
  email: {
    unique: true,
    required: true,
    type: String
  },
  equipo: {
    type: String,
    ref: 'Team'
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  registerToken: String,
  habilitado: {
    type: Boolean,
    default: false
  },
  administrador: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

userSchema.methods.toJSON = function() {
 var obj = this.toObject();
 delete obj.password;
 return obj;
}

userSchema.plugin(uniqueValidator);

var User = mongoose.model('User', userSchema);

module.exports = User;
