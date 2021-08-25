const { response, request } = require("express");

const createUser = (req = request, res = response) => {
  const { name, email, password } = req.body;

  return res.json({
    ok: true,
    msg: "Create new user /new",
  });
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
