const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  try {
    // Check Email if already exist
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "This email already exists!",
      });
    }

    // Create User with User Model
    user = new User(req.body);

    // Hash Password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Generate JWT - Token
    const token = await generateJWT(user.id, name);

    // Save it to Database
    await user.save();

    // Generate success response
    return res.status(201).json({
      ok: true,
      uid: user.id,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact Admin",
    });
  }
};

const loginUser = (req = request, res = response) => {
  const { email, password } = req.body;

  return res.json({
    ok: true,
    msg: "Login user /",
  });
};

const renewToken = (req = request, res = response) => {
  return res.json({
    ok: true,
    msg: "Renew Token",
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
