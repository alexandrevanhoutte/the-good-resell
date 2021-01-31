const express = require('express');
const router = express.Router();
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");

const User = require('../model/User')

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

module.exports = router;
