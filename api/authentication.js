var express = require('express');
var router = express.Router(),
  jwt = require('jsonwebtoken'),
  User = require('./models/user'),
  bcrypt = require('bcrypt');

router.post("/api/login", function(req, res) {
  if (req.body.username && req.body.password) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
      username: username
    }, function(err, user) {
      if (!user) {
        return res.status(400).json({message: "no such user found"});
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
        var payload = {
          id: user.id
        };
        var token = jwt.sign(payload, 'ReleaseTheKraken876');
        return res.json({message: "ok", role: user.role, token: token});
      } else {
        return res.status(400).json({message: "passwords did not match"});
      }

    });
  } else {
    return res.status(400).json({message: "username and password are required"})
  }
});

module.exports = router;
