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
    const token = await generateJWT(user.id, name, email);

    // Save it to Database
    await user.save();

    // Generate success response
    return res.status(201).json({
      ok: true,
      uid: user.id,
      name,
      email,
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

const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Check if Email is Valid
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Email doesnt exist",
      });
    }

    // Validate Password
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).json({
        ok: false,
        msg: "The password is invalid",
      });
    }

    // Generate JWT - TOKEN
    const token = await generateJWT(user.id, user.name, user.email);

    // Response from Server
    return res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "Contact the Admin",
    });
  }
};

const renewToken = async (req = request, res = response) => {
  const { uid } = req;

  // Read the DataBase
  const user = await User.findById(uid);

  // Generate JWT - Token
  const token = await generateJWT(uid, user.name);

  return res.json({
    ok: true,
    uid,
    name: user.name,
    email: user.email,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
