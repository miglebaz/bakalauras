const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateNewUserInput = require('../../validation/register');
const validateUsersLogInput = require('../../validation/login');

// schema User
const User = require('../../models/User');

// @route   GET api/users/test

router.get('/test', (request, response) => response.json({ msg: 'Users Works' }));



router.post('/register', (request, response) => { //api/users/register
  const { warnings, isValid } = validateNewUserInput(request.body);

  if (!isValid) {
    return response.status(400).json(warnings);
  }

  User.findOne({ email: request.body.email }).then(user => {
    if (user) {
      warnings.email = 'El. paštas jau egzistuoja';
      return response.status(400).json(warnings);
    } else {
      const avatar = gravatar.url(request.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: request.body.name,
        email: request.body.email,
        avatar,
        password: request.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => response.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (request, response) => {
  const { warnings, isValid } = validateUsersLogInput(request.body);

  if (!isValid) {
    return response.status(400).json(warnings);
  }

  const email = request.body.email;
  const password = request.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      warnings.email = 'User not found';
      return response.status(404).json(warnings);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            response.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        warnings.password = 'Password incorrect';
        return response.status(400).json(warnings);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    response.json({
      id: request.user.id,
      name: request.user.name,
      email: request.user.email
    });
  }
);

module.exports = router;
