const express = require('express');
const router = express.Router();
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require('../model/User')

require('dotenv').config()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post(
  '/signup',
  [
    check("username", "Please enter a Valid Username")
      .not()
      .isEmpty()
      .isLength({
        min: 4, max:20
      }),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
      })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {
      username,
      email,
      password
    } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          msg: "User already exists"
        });
      }
      user = new User({
        username,
        email,
        password
      })
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.status(200).json({
        msg: "User created"
      });
    } catch(err) {
      console.log(err.message);
      res.status(500).send("Error in saving")
    }
  }
)

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    const {email, password} = req.body;
    try {
      let user = await User.findOne({
        email
      })
      if (!user) {
        return res.status(400).json({msg: "User not exist"})
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({token});
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({message: "Server Error"});
    }
  }
)

module.exports = router;
