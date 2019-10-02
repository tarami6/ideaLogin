const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Get user module
const User = require("../../models/User");

// @route  POST api/auth
// @desc   Login user, user all ready exists in the DB idea/idea
// @access Public
router.post(
  "/",
  [
    check("name", "Please include an user name")
      .not()
      .isEmpty(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // We can use it / There is a Client do validation
      return res.status(400).json({ errors: errors.array() });
    }
    let { name, password } = req.body;

    try {
      let user = await User.findOne({ name });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log("user", isMatch);
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); //Response token to client
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
