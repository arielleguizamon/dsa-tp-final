var express = require('express');
var router = express.Router(),
  jwt = require('jsonwebtoken'),
  User = require('./models/user'),
  bcrypt = require('bcrypt');

router.post("/api/login", function(req, res) {
  if (req.body.username && req.body.password) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}).populate('equipo').exec(function(err, user) {
      if (!user) {
        return res.status(400).json({
          errors: {
            username: {
              message: "Usuario no encontrado"
            }
          }
        });
      }
      if (!user.habilitado) {
        return res.status(400).json({
          errors: {
            username: {
              message: "Active su usuario desde el mail recibido"
            }
          }
        })
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
        var payload = {
          id: user.id
        };
        var token = jwt.sign(payload, 'ReleaseTheKraken876');
        return res.status(200).json({token: token, administrador: user.administrador, nombre: user.nombre, apellido: user.apellido, equipo: user.equipo});
      } else {
        return res.status(400).json({
          errors: {
            password: {
              message: "Contraseña incorrecta"
            }
          }
        });
      }

    });
  } else {
    return res.status(400).json({
      errors: {
        username: {
          message: "Username and Password are required"
        }
      }
    })
  }
});

module.exports = router;
