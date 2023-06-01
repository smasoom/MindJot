const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = "MASOOMISAGOOD$GIRL"
const jwt = require('jsonwebtoken');


// Create a user using POST "/api/auth", doesn't require authentication
router.post('/', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = await bcrypt.genSaltSync(10);
const secPass = await bcrypt.hashSync(req.body.password, salt);



  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
     const data= {
      user:{
        id:user.id
      }
     }
    const  authToken= jwt.sign(data, JWT_SECRET);
    res.json(authToken);
    console.log(jwtData)
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});





// AUTHENTICATE BY LOGIN using POST "/api/auth/login", doesn't require authentication
router.post('/login', [
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password cannot be blank').exists()


], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }})

module.exports = router